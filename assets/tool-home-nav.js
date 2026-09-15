(function () {
  "use strict";

  const HOME_URL = new URL("../index.html", document.currentScript.src).href;
  const LINK_ID = "tool-home-link";
  const EXIT_FULLSCREEN_ID = "exitFullscreen";
  const ENTER_FULLSCREEN_ID = "enterFullscreen";
  const FULLSCREEN_CONTROLS_CLASS = "ldl-fullscreen-controls";
  const WATERMARK_ID = "ldl-visible-watermark";
  const WATERMARK_TEXT = "\u00a9 2026 \u00b7 Yung Fu Chuen";
  const STYLE_ID = "tool-home-nav-style";
  const FINGERPRINT_TEMPLATE_ID = "ldl-source-fingerprint";
  const SVG_REFERENCE_ID = "ldl-source-fingerprint-svg";
  const JSON_REFERENCE_ID = "ldl-source-reference";
  const HIDDEN_REFERENCE_ID = "ldl-hidden-source-reference";
  const COMMENT_MARKER = "LDL_SOURCE_REFERENCE";
  const SOURCE_VERSION = "Yung Fu Chuen Portfolio v1";
  const RELEASE_YEAR = "2026";
  const AUTHOR = "Yung Fu Chuen";
  const CONSOLE_FLAG = "__LDL_SOURCE_REFERENCE_LOGGED__";

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      :root {
        --ldl-top-control-top: max(14px, env(safe-area-inset-top));
        --ldl-top-control-left: max(14px, env(safe-area-inset-left));
        --ldl-top-control-right: max(14px, env(safe-area-inset-right));
        --ldl-watermark-line: max(61px, calc(env(safe-area-inset-top) + 47px));
        --ldl-page-content-start: var(--ldl-watermark-line);
      }

      html:fullscreen,
      html:fullscreen body {
        overflow-y: auto;
      }

      body[data-ldl-reserve-top-space="true"] {
        padding-top: var(--ldl-page-content-start) !important;
      }

      #${LINK_ID} {
        position: fixed !important;
        z-index: 2147483647 !important;
        top: var(--ldl-top-control-top) !important;
        left: var(--ldl-top-control-left) !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: auto !important;
        min-height: 38px !important;
        padding: 0 14px !important;
        border: 1px solid rgba(255, 255, 255, 0.82) !important;
        border-radius: 8px !important;
        color: #ffffff;
        background: linear-gradient(135deg, #0f766e, #134e4a);
        box-shadow: 0 8px 22px rgba(31, 41, 55, 0.12);
        font-size: 15px !important;
        font-weight: 800 !important;
        line-height: 1.1 !important;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
        letter-spacing: 0 !important;
        text-decoration: none !important;
        white-space: nowrap !important;
        transition: transform 160ms ease, filter 160ms ease, box-shadow 160ms ease;
        -webkit-tap-highlight-color: transparent;
      }

      #${LINK_ID}:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(31, 41, 55, 0.16);
      }

      #${LINK_ID}:focus-visible {
        outline: 4px solid rgba(20, 184, 166, 0.38);
        outline-offset: 3px;
      }

      #${LINK_ID}:active {
        transform: scale(0.97);
      }

      @media (max-width: 560px) {
        #${LINK_ID} {
          left: max(8px, env(safe-area-inset-left)) !important;
          width: auto !important;
          min-height: 34px !important;
          padding: 0 10px !important;
          font-size: 13px !important;
        }
      }

      .${FULLSCREEN_CONTROLS_CLASS} {
        position: fixed !important;
        z-index: 2147483647 !important;
        top: var(--ldl-top-control-top) !important;
        right: var(--ldl-top-control-right) !important;
        bottom: auto !important;
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: flex-end !important;
        gap: 8px !important;
        pointer-events: auto !important;
      }

      .${FULLSCREEN_CONTROLS_CLASS} .top-button,
      #${EXIT_FULLSCREEN_ID},
      #${ENTER_FULLSCREEN_ID} {
        position: static !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: auto !important;
        min-width: 0 !important;
        min-height: 38px !important;
        padding: 0 12px !important;
        border: 1px solid rgba(255, 255, 255, 0.82) !important;
        border-radius: 8px !important;
        color: #ffffff;
        box-shadow: 0 8px 22px rgba(31, 41, 55, 0.12);
        font-size: 15px !important;
        font-weight: 800 !important;
        line-height: 1.1 !important;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
        letter-spacing: 0 !important;
        white-space: nowrap !important;
        cursor: pointer !important;
        transition: transform 160ms ease, filter 160ms ease, box-shadow 160ms ease;
        -webkit-tap-highlight-color: transparent;
      }

      #${EXIT_FULLSCREEN_ID} {
        background: linear-gradient(135deg, #3730a3, #1e3a8a);
      }

      #${ENTER_FULLSCREEN_ID} {
        background: linear-gradient(135deg, #2563eb, #075985);
      }

      .${FULLSCREEN_CONTROLS_CLASS} .top-button:hover,
      #${EXIT_FULLSCREEN_ID}:hover,
      #${ENTER_FULLSCREEN_ID}:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(31, 41, 55, 0.16);
      }

      .${FULLSCREEN_CONTROLS_CLASS} .top-button:focus-visible,
      #${EXIT_FULLSCREEN_ID}:focus-visible,
      #${ENTER_FULLSCREEN_ID}:focus-visible {
        outline: 4px solid rgba(20, 184, 166, 0.38);
        outline-offset: 3px;
      }

      .${FULLSCREEN_CONTROLS_CLASS} .top-button:active,
      #${EXIT_FULLSCREEN_ID}:active,
      #${ENTER_FULLSCREEN_ID}:active {
        transform: scale(0.97);
      }

      @media (max-width: 560px) {
        :root {
          --ldl-top-control-left: max(8px, env(safe-area-inset-left));
          --ldl-top-control-right: max(8px, env(safe-area-inset-right));
          --ldl-watermark-line: max(57px, calc(env(safe-area-inset-top) + 43px));
        }

        .${FULLSCREEN_CONTROLS_CLASS} {
          gap: 6px !important;
        }

        .${FULLSCREEN_CONTROLS_CLASS} .top-button,
        #${EXIT_FULLSCREEN_ID},
        #${ENTER_FULLSCREEN_ID} {
          width: auto !important;
          min-width: 0 !important;
          min-height: 34px !important;
          padding: 0 9px !important;
          font-size: 13px !important;
        }
      }

      #${WATERMARK_ID} {
        position: fixed;
        z-index: 2147483646;
        left: max(10px, env(safe-area-inset-left));
        right: auto;
        top: var(--ldl-watermark-line);
        bottom: auto;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 5px;
        max-width: min(190px, calc(100vw - 20px));
        padding: 0;
        border: 0;
        border-radius: 0;
        color: rgba(23, 32, 51, 0.56);
        background: transparent;
        box-shadow: none;
        font-size: 8px;
        font-weight: 600;
        line-height: 1.25;
        letter-spacing: 0;
        pointer-events: none;
        user-select: none;
        -webkit-user-select: none;
        backdrop-filter: none;
      }

      #${WATERMARK_ID} span {
        min-width: 0;
        overflow-wrap: anywhere;
      }


      .ldl-offscreen-source-reference {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        margin: -1px !important;
        padding: 0 !important;
        overflow: hidden !important;
        clip: rect(0 0 0 0) !important;
        clip-path: inset(50%) !important;
        border: 0 !important;
        white-space: nowrap !important;
      }

      @media (max-width: 520px) {
        #${WATERMARK_ID} {
          left: max(8px, env(safe-area-inset-left));
          right: auto;
          top: var(--ldl-watermark-line);
          bottom: auto;
          font-size: 7px;
        }

  
      @media print {
        #${LINK_ID},
        .${FULLSCREEN_CONTROLS_CLASS} {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function findMountRoot() {
    return (
      document.querySelector("[data-tool-home-nav-root]") ||
      document.querySelector(".app, .game, main") ||
      document.body
    );
  }

  function initToolHomeNav() {
    ensureStyle();

    const mountRoot = findMountRoot();
    ensureSourceReference(mountRoot);

    let link = document.getElementById(LINK_ID);
    if (!link) {
      link = document.createElement("a");
      link.id = LINK_ID;
    }
    link.textContent = "\u5de5\u5177\u7e3d\u89bd";
    link.href = HOME_URL;
    link.target = "_top";
    link.setAttribute("aria-label", "\u524d\u5f80\u5de5\u5177\u7e3d\u89bd");

    if (link.parentElement !== mountRoot) {
      mountRoot.appendChild(link);
    }

    ensureFullscreenControls(mountRoot);
    ensureRepairObserver(mountRoot);
  }

  function ensureFullscreenControls(mountRoot) {
    let controls = document.querySelector(`.${FULLSCREEN_CONTROLS_CLASS}`);
    if (!controls) {
      controls = document.createElement("div");
      controls.className = FULLSCREEN_CONTROLS_CLASS;
      controls.setAttribute("aria-label", "\u5168\u87a2\u5e55\u63a7\u5236");
      mountRoot.appendChild(controls);
    }

    const enterButton = ensureButton(
      controls,
      ENTER_FULLSCREEN_ID,
      "\u5168\u87a2\u5e55",
      "\u9032\u5165\u5168\u87a2\u5e55"
    );
    const exitButton = ensureButton(
      controls,
      EXIT_FULLSCREEN_ID,
      "\u9000\u51fa",
      "\u6309 ESC \u6216\u6b64\u6309\u9215\u9000\u51fa\u5168\u87a2\u5e55"
    );
    controls.append(enterButton, exitButton);

    bindFullscreenButton(enterButton, requestFullscreen);
    bindFullscreenButton(exitButton, exitFullscreen);
  }

  function ensureButton(parent, id, label, ariaLabel) {
    let button = document.getElementById(id);
    if (!button) {
      button = document.createElement("button");
      button.id = id;
      button.type = "button";
      parent.appendChild(button);
    } else if (!button.type) {
      button.type = "button";
    }

    button.classList.add("top-button");
    button.textContent = label;
    button.setAttribute("aria-label", ariaLabel);
    button.title = label;

    if (button.parentElement !== parent) {
      parent.appendChild(button);
    }

    return button;
  }

  function bindFullscreenButton(button, handler) {
    if (button.dataset.ldlFullscreenBound === "true") return;
    button.dataset.ldlFullscreenBound = "true";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      handler();
    });
  }

  function requestFullscreen() {
    const root = document.documentElement;
    if (document.fullscreenElement) return;
    if (root.requestFullscreen) {
      root.requestFullscreen().catch(() => {});
    }
  }

  function exitFullscreen() {
    if (!document.fullscreenElement || !document.exitFullscreen) return;
    document.exitFullscreen().catch(() => {});
  }

  function ensureSourceReference(mountRoot) {
    const record = buildSourceRecord();
    ensureHeadMetadata(record);
    ensureDatasetMarkers(record);
    ensureFingerprintTemplate(record);
    ensureSourceComment(record);
    ensureJsonReference(record);
    ensureHiddenReference(record);
    ensureSvgMetadata(record);
    ensureVisibleWatermark(mountRoot, record);
    exposeSourceReference(record);
    logSourceReferenceOnce(record);
  }

  function buildSourceRecord() {
    const html = document.documentElement;
    const body = document.body || {};
    const toolId =
      getMetaContent("ldl-tool-id") ||
      html.getAttribute("data-ldl-tool-id") ||
      body.getAttribute?.("data-ldl-tool-id") ||
      "";
    const fingerprint =
      getMetaContent("ldl-fingerprint") ||
      html.getAttribute("data-ldl-fingerprint") ||
      body.getAttribute?.("data-ldl-fingerprint") ||
      (toolId ? `ldl-yfc-${toolId.toLowerCase()}-v1` : "ldl-yfc-shared-tool-nav-v1");

    return Object.freeze({
      sourceReference: SOURCE_VERSION,
      author: AUTHOR,
      releaseYear: RELEASE_YEAR,
      visibleWatermarkText: WATERMARK_TEXT,
      toolId,
      moduleId: body.getAttribute?.("data-ldl-module-id") || getMetaContent("ldl-module-id") || "",
      buildId: body.getAttribute?.("data-ldl-build-id") || getMetaContent("ldl-build-id") || "",
      fingerprint,
      markerSignature: `LDL_SOURCE_REFERENCE::${AUTHOR}::${RELEASE_YEAR}`
    });
  }

  function getMetaContent(name) {
    const meta = document.head && document.head.querySelector(`meta[name="${name}"]`);
    return meta ? meta.getAttribute("content") || "" : "";
  }

  function upsertMeta(name, content) {
    if (!document.head || !content) return;
    let meta = document.head.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", name);
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
  }

  function ensureHeadMetadata(record) {
    upsertMeta("author", record.author);
    upsertMeta("copyright", `${WATERMARK_TEXT}. All rights reserved.`);
    upsertMeta("ldl-source-reference", `${record.sourceReference} | ${record.author}`);
    upsertMeta("ldl-release-year", record.releaseYear);
    upsertMeta("ldl-fingerprint", record.fingerprint);
    if (record.toolId) upsertMeta("ldl-tool-id", record.toolId);
    if (record.moduleId) upsertMeta("ldl-module-id", record.moduleId);
    if (record.buildId) upsertMeta("ldl-build-id", record.buildId);
  }

  function ensureDatasetMarkers(record) {
    const html = document.documentElement;
    html.dataset.ldlSourceReference = record.sourceReference;
    html.dataset.ldlReleaseYear = record.releaseYear;
    html.dataset.ldlFingerprint = record.fingerprint;
    if (record.toolId && !html.dataset.ldlToolId) html.dataset.ldlToolId = record.toolId;

    if (!document.body) return;
    document.body.dataset.ldlSourceReference = record.sourceReference;
    document.body.dataset.ldlReleaseYear = record.releaseYear;
    document.body.dataset.ldlFingerprint = record.fingerprint;
    if (record.toolId && !document.body.dataset.ldlToolId) {
      document.body.dataset.ldlToolId = record.toolId;
    }
  }

  function ensureFingerprintTemplate(record) {
    const parent = document.body || document.documentElement;
    let template = document.getElementById(FINGERPRINT_TEMPLATE_ID);
    if (!template) {
      template = document.createElement("template");
      template.id = FINGERPRINT_TEMPLATE_ID;
      parent.appendChild(template);
    }
    template.dataset.ldlSourceReference = record.sourceReference;
    template.dataset.ldlReleaseYear = record.releaseYear;
    template.dataset.ldlFingerprint = record.fingerprint;
    const templateHtml = `<!-- ${COMMENT_MARKER}: ${escapeHtml(record.markerSignature)} -->`;
    if (template.innerHTML !== templateHtml) {
      template.innerHTML = templateHtml;
    }
  }

  function ensureSourceComment(record) {
    const parent = document.body || document.documentElement;
    const exists = Array.from(parent.childNodes).some(
      (node) => node.nodeType === Node.COMMENT_NODE && node.nodeValue.includes(COMMENT_MARKER)
    );
    if (!exists) {
      parent.appendChild(document.createComment(` ${COMMENT_MARKER}: ${record.markerSignature} `));
    }
  }

  function ensureJsonReference(record) {
    const parent = document.body || document.documentElement;
    let script = document.getElementById(JSON_REFERENCE_ID);
    if (!script) {
      script = document.createElement("script");
      script.id = JSON_REFERENCE_ID;
      script.type = "application/json";
      parent.appendChild(script);
    }
    const json = JSON.stringify(record, null, 2);
    if (script.textContent !== json) {
      script.textContent = json;
    }
  }

  function ensureHiddenReference(record) {
    const parent = document.body || document.documentElement;
    let hidden = document.getElementById(HIDDEN_REFERENCE_ID);
    if (!hidden) {
      hidden = document.createElement("div");
      hidden.id = HIDDEN_REFERENCE_ID;
      parent.appendChild(hidden);
    }
    hidden.className = "ldl-offscreen-source-reference";
    hidden.setAttribute("aria-hidden", "true");
    hidden.dataset.ldlSourceReference = record.sourceReference;
    hidden.dataset.ldlAuthor = record.author;
    hidden.dataset.ldlReleaseYear = record.releaseYear;
    hidden.dataset.ldlFingerprint = record.fingerprint;
    hidden.dataset.ldlMarkerSignature = record.markerSignature;
    const hiddenText = `${COMMENT_MARKER} | ${record.markerSignature}`;
    if (hidden.textContent !== hiddenText) {
      hidden.textContent = hiddenText;
    }
  }

  function ensureSvgMetadata(record) {
    const parent = document.body || document.documentElement;
    let svg = document.getElementById(SVG_REFERENCE_ID);
    if (!svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.id = SVG_REFERENCE_ID;
      parent.appendChild(svg);
    }
    svg.setAttribute("class", "ldl-offscreen-source-reference");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.dataset.ldlSourceReference = record.sourceReference;
    svg.dataset.ldlFingerprint = record.fingerprint;

    let metadata = svg.querySelector("metadata");
    if (!metadata) {
      metadata = document.createElementNS("http://www.w3.org/2000/svg", "metadata");
      svg.appendChild(metadata);
    }
    const metadataText = JSON.stringify(record);
    if (metadata.textContent !== metadataText) {
      metadata.textContent = metadataText;
    }
  }

  function ensureVisibleWatermark(mountRoot, record) {
    let watermark = document.getElementById(WATERMARK_ID);
    if (!watermark) {
      watermark = document.createElement("div");
      watermark.id = WATERMARK_ID;
      mountRoot.appendChild(watermark);
    }

    watermark.className = WATERMARK_ID;
    watermark.setAttribute("aria-hidden", "true");
    watermark.dataset.ldlSourceReference = record.sourceReference;
    watermark.dataset.ldlReleaseYear = record.releaseYear;
    watermark.dataset.ldlFingerprint = record.fingerprint;
    watermark.dataset.ldlMarkerSignature = record.markerSignature;

    watermark.querySelectorAll("img").forEach((logo) => logo.remove());

    let text = watermark.querySelector("span");
    if (!text) {
      text = document.createElement("span");
      watermark.appendChild(text);
    }
    if (text.textContent !== WATERMARK_TEXT) {
      text.textContent = WATERMARK_TEXT;
    }
  }

  function exposeSourceReference(record) {
    try {
      Object.defineProperty(window, "__LDL_SOURCE_REFERENCE__", {
        value: record,
        writable: false,
        configurable: true,
        enumerable: false
      });
    } catch (error) {}
  }

  function logSourceReferenceOnce(record) {
    if (window[CONSOLE_FLAG]) return;
    window[CONSOLE_FLAG] = true;
    try {
      console.info(`${WATERMARK_TEXT} | ${record.sourceReference}`);
    } catch (error) {}
  }

  function ensureRepairObserver(mountRoot) {
    if (!window.MutationObserver || document.documentElement.dataset.ldlRepairObserver === "true") return;
    document.documentElement.dataset.ldlRepairObserver = "true";

    let queued = false;
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      window.setTimeout(() => {
        queued = false;
        ensureSourceReference(mountRoot);
      }, 250);
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initToolHomeNav, { once: true });
  } else {
    initToolHomeNav();
  }
})();
