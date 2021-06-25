export default {
  schema: {
    type: "object",
    title: 'File Upload',
    description: 'Quick file upload interface',
    properties: {
      alert: {
        type: "string",
        enum: ['info', 'warning', 'success', 'danger'],
        default: "info"
      },
      files: {
        type: "integer",
        format: "files"
      }
    },
    required: ['alert', 'files']
  },
  back: () => {
    console.log('back')
    return []
  },
  watch: (M, Msg) => {
    console.log('watch')
    console.log(M)
    console.log(Msg)
    return Msg.concat((M.files || []).map(F => ({
      data: F.name,
      type: M.type,
      close: true
    })))
  }
}
