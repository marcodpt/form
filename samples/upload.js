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
        type: "array",
        format: "files"
      }
    },
    required: ['alert', 'files']
  },
  back: () => [],
  watch: (M, Msg) => Msg.concat((M.files || []).map(F => ({
    data: F.name,
    alert: M.alert,
    close: true
  })))
}
