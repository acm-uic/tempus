<img align="right" src="public/images/logo120.png" />

# tempus

[![GitHub Actions](https://github.com/bmiddha/tempus/workflows/CI/badge.svg?branch=master&event=push)](https://github.com/bmiddha/tempus/actions?query=workflow%3ACI)
[![Release](https://img.shields.io/website?label=release&url=https%3A%2F%2Ftempus.bmiddha.dev%2F)](https://tempus.bmiddha.dev)
[![License](https://img.shields.io/github/license/bmiddha/tempus)](https://github.com/bmiddha/tempus/blob/master/LICENSE)

A clock replacement for the office of [ACM@UIC](https://acm.cs.uic.edu).

## Features

### Time

Time and date for the client's timezone.

### Transit

Upcoming arrivals for CTA Bus and Train stops specified by the user.

### Weather

Weather for specified location by the user from DarkSky's Weather API.

### Events

Upcoming events for the specifed calendar ids from Google Calendar API.

### SlackBot

Interactions using Slack's Real Time Messaging API. The app can interpret mentions and direct messages.

## Configuration

| Feature  | Configuration Name                                                  |
| -------- | ------------------------------------------------------------------- |
| Time     |                                                                     |
| Transit  | `ctabusapikey`, `ctabusstops`, `ctatrainapikey`, `ctatrainstations` |
| Weather  | `darkskyapikey`, `latlong`                                          |
| Events   | `googleapikey`, `googlecalendarids`                                 |
| SlackBot | `slackbottoken`                                                     |
| GitHub   | `githubrepo`                                                        |

## Docker Container Deployment

The app is packaged into a tiny (based on [nginx](https://hub.docker.com/_/nginx)) and easy to deploy docker container: [bmiddha/tempus](https://hub.docker.com/r/bmiddha/tempus).

```sh
docker run -d --restart=always -p 8080:80 bmiddha/tempus
```

## Deploying a Raspberry Pi as a Kiosk

### Using `pi-kiosk.sh`

Usage: `sudo bash pi-kiosk.sh <WEBSITE> <DISPLAY ORIENTATION: normal|left|right|inverted>`

Example:

```sh
sudo bash pi-kiosk.sh http://localhost:8080 normal
```

### Manual

These instructions should apply to I used a Raspberry Pi 4 Model B but should work for all Pis.

Enable ssh and set password for user `pi` as needed.

Disable overscan

```sh
sudo sed -i '1s/^/disable_overscan=1\n/' /boot/config.txt
```

Configure autologon

```sh
sudo mkdir -pv /etc/systemd/system/getty@tty1.service.d
sudo cat << EOF >> /etc/systemd/system/getty@tty1.service.d/autologin.conf
[Service]
ExecStart=
ExecStart=-/sbin/agetty --autologin pi --noclear %I $TERM
EOF
sudo cat << EOF >> /etc/systemd/system/getty@tty1.service.d/noclear.conf
[Service]
TTYVTDisallocate=no
EOF
```

Configure timezone, locale, and keyboard layout.

```sh
cat <<EOF > /etc/default/keyboard
XKBMODEL="pc105"
XKBLAYOUT="us"
XKBVARIANT=""
XKBOPTIONS=""
BACKSPACE="guess"
EOF
sudo timedatectl set-ntp true
sudo timedatectl set-timezone America/Chicago
sudo cp /etc/locale.gen /etc/locale.gen.bak
echo 'en_US.UTF-8 UTF-8' | sudo tee /etc/locale.gen
sudo locale-gen en_US.UTF-8
sudo update-locale en_US.UTF-8
```

Run system, and firmware updates.

```sh
sudo apt update && sudo apt upgrade -y
sudo SKIP_WARNING=1 rpi-update
```

Install X11 Server and, Chromium.

```sh
sudo apt install --no-install-recommends -y vim chromium-browser xserver-xorg x11-xserver-utils xinit openbox
```

Configure openbox to start `chromium-browser`. Replace `WEBSITE` varibale as needed.

```sh
WEBSITE='http://localhost:8080' cat << EOF >> /etc/xdg/openbox/autostart
# Disable any form of screen saver / screen blanking / power management
xset s off
xset s noblank
xset -dpms

# Allow quitting the X server with CTRL-ATL-Backspace
setxkbmap -option terminate:ctrl_alt_bksp

# Start Chromium in kiosk mode
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' ~/.config/chromium/'Local State'
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/; s/"exit_type":"[^"]\+"/"exit_type":"Normal"/' ~/.config/chromium/Default/Preferences
xrandr --output HDMI-1 --rotate left
chromium-browser --disable-infobars --kiosk $WEBSITE
EOF
```

Start openbox on boot

```sh
echo '[[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && startx -- -nocursor' | sudo tee -a /home/pi/.profile
```
