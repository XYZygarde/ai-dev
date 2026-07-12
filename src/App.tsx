import { useState } from "react";
import {
  BoothSettingForm,
  type BoothSettings,
  DEFAULT_BOOTH_SETTINGS,
} from "./boothSetting";

export default function App() {
  const [settings, setSettings] = useState<BoothSettings>(DEFAULT_BOOTH_SETTINGS);

  return (
    <main className="app">
      <BoothSettingForm onSave={setSettings} />
      <p className="saved-settings">
        Current: {settings.numberOfShots} shots, {settings.countdownSeconds}s countdown
      </p>
    </main>
  );
}
