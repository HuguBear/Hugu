export default (name) => {
  if (/^([0-9]{12})$/.test(name)) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December']
    return months[(name[2] + name[3] - 1)] + ' ' + (name[4] + name[5]) + ', ' + (name[6] + name[7]) + ':' + (name[8] + name[9])
  } else if (name.length > 15) {
    return name.substring(0, 12) + '...'
  } else {
    return name
  }
}
