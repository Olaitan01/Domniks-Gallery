import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ilpvyjjj',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    // Set the appId returned after a successful deploy to avoid being prompted
    // for a hostname/app id on subsequent deploys.
    appId: 'cpiazox2w10puwxcueg1lp52',
  }
})
