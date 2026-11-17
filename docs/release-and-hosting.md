# Release and hosting kit: ECAT Prep

Piece 11, prepared 14 Nov 2026, modelled on MDCAT Prep's kit (`/mnt/storage/projects/mdcat/docs/release-and-hosting.md`).
Claude prepares, Homi uploads.

## Build
- Package `com.homilabs.ecatprep` (chosen by Homi 14 Nov 2026; locked after the first Play upload). Launcher name
  "ECAT Prep". Version 1.0.0 (versionCode 1).
- Release build: `bash scripts/release.sh`. It:
  - builds the web app with the **live** ad unit and checks the test unit is gone;
  - runs Gradle through `jobq`;
  - writes `releases/1.0.0-1/ecat-prep-1.0.0-1.aab` (upload this to Play) and `.apk` (sideload test);
  - puts the test unit back.
  Everything else (`npm run build`, debug APKs, the committed `dist/`) always uses Google's test unit.
- Before every release: bump `versionCode`/`versionName` in `android/app/build.gradle` and `version` in
  `package.json`; `npm run build` must pass all content checks.
- **Signing:**
  - Upload key created 14 Nov 2026: `.secrets/ecat-upload.keystore`, alias `ecat-upload`, RSA 2048, valid to 2054.
  - Passwords in `.secrets/ecat-upload-keystore-credentials.txt`, read via `android/keystore.properties` (gitignored).
  - Certificate SHA-256 `D4:B1:DD:3E:3A:ED:12:5A:D3:C0:EF:EA:71:5E:2E:1A:49:A7:98:50:D2:03:CD:7D:A8:1A:41:81:D2:96:D9:24`.
  - `.secrets/` goes to the local and Drive backups, never GitHub. Losing it means asking Play support for an
    upload-key reset.
- Android: Capacitor 8, compile/target SDK 36, min SDK 24 (same as MDCAT Prep).

## Ads (AdMob, account homilabs.smc@gmail.com; details in `docs/admob.md`)
- App `ca-app-pub-2087846699268567~8802091734` (in `AndroidManifest.xml`); interstitial
  `ecat_interstitial_between_sessions` `ca-app-pub-2087846699268567/3958773256` (in `build/build.js`, release only).
- When ads show: after every 2nd finished practice set and when a mock is submitted, at least 3 minutes apart, never
  during a question, a set or a mock (`adBreak()` in `src/app.js`).
- Consent: Google UMP at start-up; About shows "Privacy & ad choices" when the form is required.
- `app-ads.txt` is live at ecat.homilabs.org (copy in `website/`).

## Website: https://ecat.homilabs.org
- Source `website/`; published with `bash scripts/publish-site.sh` (the `deploy` branch checked out in
  `public_html/ecat`).
- 14 Nov 2026: `privacy.html` ad-timing sentence corrected to match the app (every 2nd set, on mock submit, 3-minute
  gap). Needs a publish.
- After the app is live, replace "Coming soon on Google Play" in `index.html` with the Play link.

## Play Console listing

| Item | Value |
|---|---|
| App name (28/30) | `ECAT Prep: MCQs & Mock Tests` |
| Short description (76/80) | `5,000 ECAT MCQs and 20 full UET mock tests for Pre-Eng & ICS. Free, offline.` |
| App icon 512×512 | `store-assets/icon-512.png` |
| Feature graphic 1024×500 | `store-assets/feature-graphic.png` |
| Phone screenshots (1080×1920) | `store-assets/screenshots/` |
| Category | Education |
| Contact email | homilabs.smc@gmail.com |
| Website | https://ecat.homilabs.org |
| Privacy policy URL | https://ecat.homilabs.org/privacy.html |
| App access | All functionality available without login |
| Ads | Yes |
| Content rating | Reference/educational. No to violence, sexuality, language, drugs, gambling, purchases and user interaction |
| Target audience | 16–17 and 18+ (ECAT candidates are about 17–20). Not directed at children |
| Data safety | **Collected and shared:** Device or other IDs (advertising ID) and App activity (app interactions) via the Google Mobile Ads SDK, purpose Advertising, shared with Google AdMob. Encrypted in transit. No account exists. Practice and mock results stay on the device and are not collected |
| Government apps / financial / health declarations | No / No / No |

**Full description:**
```
Preparing for ECAT, UET's entry test for engineering? Practise every FSc chapter of Mathematics, Physics, Chemistry, Computer Science and English, and sit full mock papers set the way the real computer-based test is.

5,000 PRACTICE MCQs
• Mathematics 1,500, Physics 1,000, Chemistry 1,000, Computer Science 1,000 and English 500, split by chapter and topic across the old and new Punjab FSc books.
• An explanation for every answer; easy, moderate and difficult levels.
• English reading comprehension with full passages, plus vocabulary and sentence correction.
• Computer Science with C and Python code shown the way you would see it on paper.
• A mistakes list to retry, bookmarks, and your accuracy for every chapter.

20 FULL MOCK PAPERS
• 100 MCQs in 100 minutes with the official split: English 10, Mathematics 30, Physics 30, and Chemistry 30 (Pre-Engineering) or Computer Science 30 (ICS).
• 2,600 separate questions, so practice never spoils a mock.
• Timer, flags and a question grid; your score out of 400, marks by subject and the chapters to practise next.

MEMORY CHEATS
• 284 one-minute revision cards: formula sheets, comparison tables, reaction maps, code rules and mnemonics.

IMPORTANT TOPICS
• Every chapter ranked Must-know, Important or Quick win, with the topics to focus on and your own accuracy next to it.

RULES AND GUIDELINES
• Paper format, groups, marking, merit calculation and how test day works.

PRIVATE AND OFFLINE
• No account. Everything works offline and your progress stays on your phone.
• Free, with light ads only between sessions: never during a question, a practice set or a mock.

ECAT Prep is independent practice material by HomiLabs. It is not affiliated with, endorsed by or connected to the University of Engineering and Technology (UET) Lahore or any other university or admissions body. All questions are original practice material, not real or recalled papers. Always check ecat.uet.edu.pk for official dates, fees and rules.
```

## Homi's steps
1. **Read-throughs (your call how much before production):** spot checks `docs/review/*-spotcheck.md` (five
   practice subjects and `mock-spotcheck.md`) and the doubts in `docs/review-flags.md`.
2. **Website:** publish the corrected privacy page (`bash scripts/publish-site.sh`, or ask Claude) and check
   https://ecat.homilabs.org/privacy.html.
3. **AdMob:** in the ECAT Prep app's settings set the privacy policy URL to https://ecat.homilabs.org/privacy.html.
   Then Privacy & messaging → European regulations: create an "ECAT Prep consent" message for this app only and
   publish it, as for MDCAT Prep.
4. **Play Console:** create the app "ECAT Prep: MCQs & Mock Tests" (free, app, en-US, package
   `com.homilabs.ecatprep`); fill in App content from the table above; add the store listing (text, icon, feature
   graphic, screenshots); upload `releases/1.0.0-1/ecat-prep-1.0.0-1.aab`, ideally to internal testing first, then
   production.
5. **After it is live:** AdMob → Add store on the app (search by the full Play URL); add the Play link on the
   website; list the app on homilabs.org.

## Device test (14 Nov 2026, emulator `ecat_api35`, Android 15)
The Tab S9 was locked, so the test ran on the project's own emulator (swangle, CPU). Debug build with Google's test
unit, driven over WebView debugging:
- **Start-up:** consent check passed; the Ads SDK started and requested a test interstitial.
- **Cold-start bug found and fixed:** the first load failed ("Missing required js parameter": the request went out
  before the SDK's own engine had loaded on a slow first launch) and nothing retried it, so that session would never
  show an ad. `adLoad()` now retries every 30 s (up to 5 times), and a due break re-requests an ad if none is ready.
  MDCAT Prep has the same code and the same gap.
- **Sets:** no ad after the 1st set; the "This is an interstitial test ad" screen after the 2nd; counter reset.
- **Dismiss:** closing the ad requested and loaded the next one.
- **Gap:** two more sets within 3 minutes showed no ad.
- **Mock:** after the gap, submitting a mock showed the next ad.
- **Release APK** (`releases/1.0.0-1/`): signed with the upload key (fingerprint above), live unit inside and no test
  unit, `com.homilabs.ecatprep` 1.0.0 (1), target SDK 36. Installed and started cleanly and sent its ad request; the
  emulator counts as a test device, so no live impression was recorded.

## Not checked by Claude
- **Live ads**: served only after the Play store link and AdMob review.
- **The consent form**: appears only for EEA/UK users once the AdMob message is published.
- **A real phone**: the Tab was locked during the test.

## Play Console (15 Nov 2026)
- **App created:** account Homilabs (9161588402757830740), app ID 4973003549111594829, package `com.homilabs.ecatprep`
  (Homi ticked the creation declarations and the IARC terms). Dashboard:
  https://play.google.com/console/u/0/developers/9161588402757830740/app/4973003549111594829/app-dashboard
- **App content:** privacy policy URL; Ads yes; sign-in none; Advertising ID yes (Advertising or marketing; the APK
  carries `AD_ID`); Government no; Financial none; Health none; target age 16-17 and 18+; content rating ESRB
  Everyone / PEGI 3 / IARC 3+.
- **Data safety** (follows Google's disclosure guidance for the Mobile Ads SDK, so it lists more than MDCAT's):
  Approximate location, App interactions, Diagnostics, Device or other IDs; each collected and shared, not
  ephemeral, required; purposes Analytics, Advertising or marketing, Fraud prevention/security/compliance;
  encrypted in transit; no accounts; deletion-request question left blank (optional).
- **Store settings:** Education; email homilabs.smc@gmail.com; website ecat.homilabs.org. Default listing text as
  above; icon, feature graphic and 7 screenshots uploaded by Homi.
- **Release:** production 1.0.0 (1), all 178 countries / regions (Homi's choice), full rollout, managed publishing
  off. Only warning: no deobfuscation file (none needed; not obfuscated). **Sent for review 15 Nov 2026** (11
  changes); Google says reviews usually finish within 7 days, and it publishes as soon as approved.
- **Still to do after approval:** AdMob → Add store (Play URL) and the "ECAT Prep consent" message; the Play link on
  ecat.homilabs.org; list the app on homilabs.org.

## Live and AdMob linked (17 Nov 2026)
- **Live on Google Play:** https://play.google.com/store/apps/details?id=com.homilabs.ecatprep
- **AdMob:** app ca-app-pub-2087846699268567~8802091734 is linked to the Play listing; it is renamed "ECAT Prep:
  MCQs & Mock Tests", verified, and approval status is "Getting ready". Google says review takes 2-3 days, with ad
  serving limited until then.
- **Consent message:** "ECAT Prep consent" under Privacy & messaging, European regulations, published 17 Nov 2026.
  It covers this app only and is in English. Privacy URL https://ecat.homilabs.org/privacy.html. User choices:
  Consent, Manage options, and Do not consent (on for every country); Close is off.
- **Website:** the "Get it on Google Play" link replaced "Coming soon" on 17 Nov 2026. Still to do: list the app on
  homilabs.org.
