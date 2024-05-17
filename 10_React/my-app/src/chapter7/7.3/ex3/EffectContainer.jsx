import React, { useState } from "react";
import EffectSummary from "./EffectSummary";

function EffectContainer() {
  const [isVisible, SetisVisible] = useState(true);
  return (
    <>
      {isVisible && <EffectSummary />}
      <br />
      <button type="button" onClick={() => SetisVisible(false)}>사라져라</button>
      <button type="button" onClick={() => SetisVisible(true)}>나타나라</button>
    </>
  );
};

export default EffectContainer;