import { FC, useState, useEffect, ChangeEvent } from "react";

interface ConfigState {
  googlecalendarids: string;
  googleapikey: string;
  darkskyapikey: string;
  latlong: string;
  ctatrainapikey: string;
  ctatrainstations: string;
  ctabusapikey: string;
  ctabusstops: string;
  slackbottoken: string;
}

const clearConfig = () => window.localStorage.clear();

const _getKeyByName = (obj: { [key: string]: any }, name: string) => obj[name];

const configFields = {
  General: {
    type: "text",
    data: [
      { name: "ctabusstops", display: "CTA Bus Stops" },
      { name: "ctatrainstations", display: "CTA Train Stations" },
      { name: "latlong", display: "Weather Lat Long" },
      { name: "googlecalendarids", display: "Google Calendar IDs" },
    ],
  },
  Secrets: {
    type: "password",
    data: [
      { name: "ctabusapikey", display: "CTA Bus API Key" },
      { name: "ctatrainapikey", display: "CTA Train API Key" },
      { name: "darkskyapikey", display: "DarkSky API Key" },
      { name: "googleapikey", display: "Google API Key" },
      { name: "slackbottoken", display: "Slack Bot Token" },
    ],
  },
};

const Config: FC = () => {
  const [formData, setFormData] = useState<ConfigState>({
    googlecalendarids: "",
    googleapikey: "",
    darkskyapikey: "",
    latlong: "",
    ctatrainapikey: "",
    ctatrainstations: "",
    ctabusapikey: "",
    ctabusstops: "",
    slackbottoken: "",
  });

  const [showSecrets, toggleShowSecrets] = useState(false);

  useEffect(() => {
    Object.keys(formData).forEach((key) => {
      setFormData({ ...formData, [key]: localStorage.getItem(key) });
    });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form action="/" method="GET">
        {Object.keys(configFields).map((k: string, key: number) => (
          <fieldset key={key}>
            <legend>{k}</legend>
            {_getKeyByName(configFields, k).data.map((e: any, key2: number) => (
              <div key={key2}>
                <label htmlFor={e.name}>{e.display}</label> <br />
                <input
                  type={
                    _getKeyByName(configFields, k).type === "password" &&
                    !showSecrets
                      ? "password"
                      : "text"
                  }
                  name={e.name}
                  value={_getKeyByName(formData, e.name)}
                  onChange={handleChange}
                />
              </div>
            ))}
          </fieldset>
        ))}
        <input
          type="checkbox"
          name="showsecrets"
          onChange={() => toggleShowSecrets(!showSecrets)}
        />
        <label htmlFor="showsecrets">Show Secrets</label>
        <br />
        <input
          type="button"
          value="Clear Stored Config"
          onClick={clearConfig}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
export default Config;
