import I18n from 'react-native-i18n'

export default (name) => {
  if (/^([0-9]{12})$/.test(name)) {
    let months = [I18n.t('january'), I18n.t('february'), I18n.t('march'),
      I18n.t('april'), I18n.t('may'), I18n.t('june'), I18n.t('july'),
      I18n.t('august'), I18n.t('september'), I18n.t('ocotober'), I18n.t('november'),
      I18n.t('december')]
    return months[(name[2] + name[3] - 1)] + ' ' + (name[4] + name[5]) + ', ' + (name[6] + name[7]) + ':' + (name[8] + name[9])
  } else if (name.length > 20) {
    return name.substring(0, 18) + '...'
  } else {
    return name
  }
}
