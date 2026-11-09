# AdMob — ECAT Prep

Created 9 Nov 2026 in the AdMob account **homilabs.smc@gmail.com** (publisher `pub-2087846699268567`).

| What | ID |
|---|---|
| App (Android) | `ca-app-pub-2087846699268567~8802091734` |
| Interstitial ad unit `ecat_interstitial_between_sessions` | `ca-app-pub-2087846699268567/3958773256` |

These IDs are not secrets: they ship inside the APK.

## Status
- Not yet linked to a store, so ad serving is **limited** ("Requires review"). After the app is live on Google Play, use **Add store** in AdMob to link the Play listing; review usually takes a few days.
- `website/app-ads.txt` (served at ecat.homilabs.org/app-ads.txt) carries this publisher ID. AdMob reads app-ads.txt from the developer website in the Play listing, so the Play listing's website should be `https://ecat.homilabs.org` (or homilabs.org, which must carry the same line).
- Rules (same as MDCAT Prep): interstitial only **between sessions** (after a practice set's results or a mock's results), never during a question, a practice set or a mock; Google's **test** ad unit while developing, the real unit only in the release build; EU/UK consent message (UMP) before ads load — create an "ECAT Prep consent" message in Privacy & messaging before release.
