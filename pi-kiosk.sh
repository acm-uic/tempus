#!/usr/bin/env bash

if [ "$EUID" -ne 0 ]; then
    echo "Please run as root"
    exit
fi

WEBSITE=$1

if [ -z "$WEBSITE" ]; then
    WEBSITE="http://localhost:8080"
    echo "No website supplied in args. Default value: $WEBSITE"
fi

ORIENTATION=$2

if [ -z "$ORIENTATION" ]; then
    ORIENTATION="normal"
    echo "No orientation supplied in args. Default value: $ORIENTATION"
fi

echo "Configuring Pi Kiosk"
echo "$WEBSITE"
echo "$ORIENTATION"

echo "Updating Pi"
apt update && apt upgrade -y
SKIP_WARNING=1 rpi-update

echo "Disabling Overscan"
sed -i '1s/^/disable_overscan=1\n/' /boot/config.txt

echo "Configuring Autologin"
mkdir -pv /etc/systemd/system/getty@tty1.service.d
cat <<EOF >/etc/systemd/system/getty@tty1.service.d/autologin.conf
[Service]
ExecStart=
ExecStart=-/sbin/agetty --autologin pi --noclear %I $TERM
EOF
cat <<EOF >/etc/systemd/system/getty@tty1.service.d/noclear.conf
[Service]
TTYVTDisallocate=no
EOF

echo "Configuring Locale and Timezone"

cat <<EOF > /etc/default/keyboard
XKBMODEL="pc105"
XKBLAYOUT="us"
XKBVARIANT=""
XKBOPTIONS=""

BACKSPACE="guess"
EOF

timedatectl set-ntp true
timedatectl set-timezone America/Chicago
cp /etc/locale.gen /etc/locale.gen.bak
echo "en_US.UTF-8 UTF-8" | tee /etc/locale.gen
locale-gen en_US.UTF-8
update-locale en_US.UTF-8

echo "Install X11, Openbox, Chromium"
apt install --no-install-recommends -y chromium-browser xserver-xorg x11-xserver-utils xinit openbox

echo "Configuring Openbox"
cat <<EOF >/etc/xdg/openbox/autostart
# Disable any form of screen saver / screen blanking / power management
xset s off
xset s noblank
xset -dpms

# Allow quitting the X server with CTRL-ATL-Backspace
setxkbmap -option terminate:ctrl_alt_bksp

# Start Chromium in kiosk mode
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' ~/.config/chromium/'Local State'
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/; s/"exit_type":"[^"]\+"/"exit_type":"Normal"/' ~/.config/chromium/Default/Preferences
xrandr --output HDMI-1 --rotate $ORIENTATION
chromium-browser --disable-infobars --kiosk $WEBSITE
EOF

echo '[[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && startx -- -nocursor' | tee -a /home/pi/.profile

reboot
