// This example shows how to make a fetch Artist monthly listener counts and trigger an email if
// the artist is due a payment for every additional 1000 streams.

// Arguments can be provided when a request is initated on-chain and used in the request source code as shown below
const artistId = args[0]
const artistName = args[1]
const lastListenerCount = parseInt(args[2])
const artistEmail = args[3]
const VERIFIED_SENDER = args[4]

// Ref: https://doc.api.soundcharts.com/api/v2/doc/reference/path/artist/get-latest-spotify-monthly-listeners
const URL = `https://sandbox.api.soundcharts.com/api/v2/artist/${artistId}/streaming/spotify/listeners`

// Get Listener Count Data.
if (!artistId) {
  throw new Error("No artistId provided.")
}
if (isNaN(lastListenerCount)) {
  throw new Error(`Listener Count is NaN: ${lastListenerCount}`)
}

// TODO #2: Implement logic to calculate payment due to the Artist
// Calculate latest listener counts and whether payments are due.
const latestListenerCount = await getLatestMonthlyListenerCount()

const diffListenerCount = latestListenerCount - lastListenerCount

if (latestListenerCount > lastListenerCount) {
  const amountDue = diffListenerCount / 10_000 // Artist gets 1 STC per 10_000 additional streams.

  console.log(
    `\nArist is due payments of ${amountDue} STC for an additional ${diffListenerCount.toLocaleString()} listeners...`
  )

  await sendEmail(latestListenerCount, amountDue) // Not implemented yet - assignment!
} else {
  console.log("\nArtist is not due additional payments...")
}

return Buffer.concat([Functions.encodeInt256(latestListenerCount), Functions.encodeInt256(diffListenerCount)])

// ====================
// Helper Functions
// ====================
async function getLatestMonthlyListenerCount() {
  console.log("\nFetching artist data from API...")

  const soundchartsResponse = await Functions.makeHttpRequest({
    url: URL,

    // Get a free sandbox API key from https://doc.api.soundcharts.com/api/v2/doc

    headers: { "x-app-id": secrets.soundchartAppId, "x-api-key": secrets.soundchartApiKey },
  })

  // Handle API error.

  if (soundchartsResponse.error) {
    const returnedErr = soundchartsResponse.response.data

    let apiErr = new Error(`API returned one or more errors: ${JSON.stringify(returnedErr)}`)

    apiErr.returnedErr = returnedErr

    throw apiErr
  }

  newListenerCount = soundchartsResponse.data.items[0].value

  console.log(
    `\nNew Listener Count: ${newListenerCount.toLocaleString()}. Last Listener Count: ${lastListenerCount.toLocaleString()}. Diff: ${(
      newListenerCount - lastListenerCount
    ).toLocaleString()}.`
  )

  return newListenerCount
}

// Use Twilio Sendgrid API to send emails.
// https://sendgrid.com/solutions/email-api
async function sendEmail(latestListenerCount, amountDue) {
  if (!secrets.twilioApiKey) {
    return
  }
  // TODO #3:  Your Stretch Assignment!
}
