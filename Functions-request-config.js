const fs = require("fs")

// Loads environment variables from .env.enc file (if it exists)
require("@chainlink/env-enc").config()

// Soundchart Artist IDs for sandbox are available from https://doc.api.soundcharts.com/api/v2/doc/sandbox-data

const BILLIE_EILISH = "11e81bcc-9c1c-ce38-b96b-a0369fe50396"

const TONES_AND_I = "ca22091a-3c00-11e9-974f-549f35141000"

const Location = {
  Inline: 0,
  Remote: 1,
}

const CodeLanguage = {
  JavaScript: 0,
}

const ReturnType = {
  uint: "uint256",
  uint256: "uint256",
  int: "int256",
  int256: "int256",
  string: "string",
  bytes: "Buffer",
  Buffer: "Buffer",
}

// Configure the request by setting the fields below
const requestConfig = {
  // Location of source code (only Inline is currently supported)
  codeLocation: Location.Inline,
  // Code language (only JavaScript is currently supported)
  codeLanguage: CodeLanguage.JavaScript,
  // ETH wallet key used to sign secrets so they cannot be accessed by a 3rd party
  walletPrivateKey: process.env["PRIVATE_KEY"],
  secretsURLs: [],
  // String containing the source code to be executed
  source: fs.readFileSync("./Twilio-Spotify-Functions-Source-Example.js").toString(),
  // Secrets can be accessed within the source code with `secrets.varName` (ie: secrets.apiKey). The secrets object can only contain string values.
  // Per-node secrets objects assigned to each DON member. When using per-node secrets, nodes can only use secrets which they have been assigned.
  // Args (string only array) can be accessed within the source code with `args[index]` (ie: args[0]).
  args: [
    TONES_AND_I,

    "Tones&I",

    "14000000", // 14 million

    process.env.ARTIST_EMAIL,

    process.env.VERIFIED_SENDER,
  ],
  // Expected type of the returned value
  expectedReturnType: ReturnType.int256,
  // Redundant URLs which point to encrypted off-chain secrets
  secrets: {
    // DON level API Keys

    soundchartAppId: process.env.SOUNDCHART_APP_ID,

    soundchartApiKey: process.env.SOUNDCHART_API_KEY,
    // TODO for stretch assignment

    twilioApiKey: "",
  },
  // Per-node secrets objects assigned to each DON member.
  // When using per-node secrets, nodes can only use secrets which they have been assigned.
  perNodeSecrets: [
    // Node level API Keys

    {
      soundchartAppId: process.env.SOUNDCHART_APP_ID,

      soundchartApiKey: process.env.SOUNDCHART_API_KEY,

      twilioApiKey: "",
    },

    {
      soundchartAppId: process.env.SOUNDCHART_APP_ID,

      soundchartApiKey: process.env.SOUNDCHART_API_KEY,

      twilioApiKey: "",
    },

    {
      soundchartAppId: process.env.SOUNDCHART_APP_ID,

      soundchartApiKey: process.env.SOUNDCHART_API_KEY,

      twilioApiKey: "",
    },

    {
      soundchartAppId: process.env.SOUNDCHART_APP_ID,

      soundchartApiKey: process.env.SOUNDCHART_API_KEY,

      twilioApiKey: "",
    },
  ],
}

module.exports = requestConfig
