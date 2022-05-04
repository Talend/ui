// @ts-ignore
function getReadableVariableNameByCaseStyle(caseStyle) {
  return function getReadableVariableName(token, tokenGroup, prefix) {
    // Create array with all path segments and token name at the end
    const segments = [...tokenGroup.path];
    if (!tokenGroup.isRoot) {
      segments.push(tokenGroup.name);
    }
    segments.push(token.name);

    if (prefix && prefix.length > 0) {
      segments.unshift(prefix);
    }

    // Create "sentence" separated by spaces so we can camelcase it all
    let sentence = segments.join(" ");

    // transform string from all segments with the right case pattern
    sentence = sentence.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => {
      switch (caseStyle) {
        case "khebab":
          return "-" + chr;
        case "camel":
          return chr.toUpperCase();
        default:
          return chr;
      }
    });

    // only allow letters, digits, underscore and hyphen
    sentence = sentence.replace(/[^a-zA-Z0-9_-]/g, "_");

    // prepend underscore if it starts with digit
    if (/^\d/.test(sentence)) {
      sentence = "_" + sentence;
    }

    return sentence;
  };
}

/**
 * Convert group name, token name and possible prefix into khebabCased string, joining everything together
 */
Pulsar.registerFunction(
  "readableVariableKhebabName",
  getReadableVariableNameByCaseStyle("khebab")
);

/**
 * Convert group name, token name and possible prefix into camelCased string, joining everything together
 */
Pulsar.registerFunction(
  "readableVariableCamelName",
  getReadableVariableNameByCaseStyle("camel")
);

function findAliases(token, allTokens) {
  let aliases = allTokens.filter(
    (t) => t.value.referencedToken && t.value.referencedToken.id === token.id
  );
  for (const t of aliases) {
    aliases = aliases.concat(findAliases(t, allTokens));
  }
  return aliases;
}

Pulsar.registerFunction("findAliases", findAliases);

Pulsar.registerFunction("gradientAngle", function (from, to) {
  var deltaY = to.y - from.y;
  var deltaX = to.x - from.x;
  var radians = Math.atan2(deltaY, deltaX);
  var result = (radians * 180) / Math.PI;
  result = result + 90;
  return (result < 0 ? 360 + result : result) % 360;
});

/**
 * Behavior configuration of the exporter
 * Prefixes: Add prefix for each category of the tokens. For example, all colors can start with "color, if needed"
 */
Pulsar.registerPayload("behavior", {
  colorTokenPrefix: "coral-Color",
  borderTokenPrefix: "coral-Border",
  gradientTokenPrefix: "coral-Color",
  measureTokenPrefix: "coral-",
  shadowTokenPrefix: "coral-",
  typographyTokenPrefix: "coral-",
  radiusTokenPrefix: "coral-",
  textTokenPrefix: "coral-",
});

Pulsar.registerFunction("rgbaToHsla", function (r, g, b, a = 1) {
  var ratiodR = r / 255;
  var ratiodG = g / 255;
  var ratiodB = b / 255;

  var cmin = Math.min(ratiodR, ratiodG, ratiodB),
    cmax = Math.max(ratiodR, ratiodG, ratiodB),
    delta = cmax - cmin,
    h;

  if (delta === 0) {
    h = 0;
  } else if (cmax === ratiodR) {
    h = ((ratiodG - ratiodB) / delta) % 6;
  } else if (cmax === ratiodG) {
    h = (ratiodB - ratiodR) / delta + 2;
  } else {
    h = (ratiodR - ratiodG) / delta + 4;
  }

  h = Math.round(h * 60);

  var hue = h + (h < 0 ? 360 : 0);

  var light = (cmax + cmin) / 2;
  var lightness = Math.round(((cmax + cmin) / 2) * 100);
  var saturation = Math.round(
    (delta === 0 ? 0 : delta / (1 - Math.abs(2 * light - 1))) * 100
  );

  var alpha = Math.round((a / 255) * 10) / 10;

  return (
    "hsla(" + hue + "," + saturation + "%," + lightness + "%," + alpha + ")"
  );
});

Pulsar.registerFunction("subFamilyToWeight", function (subfamily) {
  const cleanSubFamily = subfamily.toLowerCase;
  switch (cleanSubFamily) {
    case "thin":
      return 100;
    case "extralight":
      return 200;
    case "light":
      return 300;
    case "normal":
      return 400;
    case "medium":
      return 500;
    case "semibold":
      return 600;
    case "bold":
      return 700;
    case "extrabold":
      return 800;
    case "black":
      return 900;
    default:
      return 400;
  }
});

Pulsar.registerFunction("pixelsToRem", function (value) {
  return `${value["measure"] / 10}rem`;
});

Pulsar.registerFunction("logKeys", function (object) {
  for (const entry in object) {
    console.log(entry);
  }
});

Pulsar.registerFunction("parseTokenType", function (token) {
  if (token.tokenType === "Text") {
    const typeFromName = token.name.split("/")[0];

    return typeFromName;
  }

  return `${token.tokenType.toLowerCase()}`;
});

Pulsar.registerFunction("baseWrap", function (token, designSystemName) {
  const stringPrefix = token.split(":")[0];
  const safeName = designSystemName.toLowerCase();
  if (stringPrefix === "data") {
    return `url("${token}")`;
  }

  if(token.includes('keyframes')){
    return token.replace('coral', `coral-${safeName}`);
  }

  return token;
});

Pulsar.registerFunction("getFigmaKey", function (token) {
  return token.origin ? token.origin.id : token.id;
});

Pulsar.registerFunction("getThemeName", function (name) {
  const safeName = name.toLowerCase();

  return safeName;
});

Pulsar.registerFunction("getSelector", function (name) {
  const safeName = name.toLowerCase();

  return '[data-theme="' + safeName + '"]';
});

// CSS
/**
 * Convert group name, token name and possible prefix into camelCased string, joining everything together
 */
 Pulsar.registerFunction(
  "readableVariableName",
  function (token, tokenGroup, prefix) {
    // Create array with all path segments and token name at the end
    const segments = [...tokenGroup.path];
    if (!tokenGroup.isRoot) {
      segments.push(tokenGroup.name);
    }
    segments.push(token.name);

    if (prefix && prefix.length > 0) {
      segments.unshift(prefix);
    }

    // Create "sentence" separated by spaces so we can camelcase it all
    let sentence = segments.join(" ");

    // camelcase string from all segments
    sentence = sentence
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => "-" + chr);

    // only allow letters, digits, underscore and hyphen
    sentence = sentence.replace(/[^a-zA-Z0-9_-]/g, "_");

    // prepend underscore if it starts with digit
    if (/^\d/.test(sentence)) {
      sentence = "_" + sentence;
    }

    return sentence;
  }
);

Pulsar.registerFunction("getScheme", function (name) {
  const safeName = name.toLowerCase();

  if (safeName === "dark") {
    return "color-scheme: dark;";
  }

  return "color-scheme: light;";
});

Pulsar.registerFunction("constructGenericTokensStyles", function (token, dsName) {
  const name = token.name;
  const safeThemeName = dsName.toLowerCase();

  if(token.name.includes('keyframes')){
    return `@keyframes ${name.replace('coral', `coral-${safeThemeName}`)} `
  }

  return token.name;
});

Pulsar.registerFunction("prefixWithThemeName", function (value, dsName) {
  const safeThemeName = dsName.toLowerCase();
  return value.replace('coral', `coral-${safeThemeName}`);
});
