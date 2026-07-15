import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'm32es5ry',
    dataset: 'production',
  },
  deployment: {
    appId: 'ybfh4cgsuwwvw1oxioqd9ngl',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
