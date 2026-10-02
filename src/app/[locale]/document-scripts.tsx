"use client";

import { useRef } from "react";
import { useServerInsertedHTML } from "next/navigation";

const themeScript = `(function(){try{var t=localStorage.getItem("csi-theme");if(t){document.documentElement.dataset.theme=t}}catch(e){}})();`;

const gtmConsentScript = `(function(){window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments);};var c="denied";try{if(localStorage.getItem("csi-consent")==="granted")c="granted";}catch(e){}window.gtag("consent","default",{ad_storage:c,ad_user_data:c,ad_personalization:c,analytics_storage:c,functionality_storage:"granted",security_storage:"granted"});})();`;

/**
 * Scripts that must run from the initial HTML, before React hydrates.
 * A `<script>` inside the layout is created again on the client and React
 * refuses to execute it. These are flushed into `<head>` only on the server.
 */
export function DocumentScripts() {
  const inserted = useRef(false);

  useServerInsertedHTML(() => {
    if (inserted.current) return null;
    inserted.current = true;

    return (
      <>
        <script id="csi-theme" dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script id="gtm-consent" dangerouslySetInnerHTML={{ __html: gtmConsentScript }} />
      </>
    );
  });

  return null;
}
