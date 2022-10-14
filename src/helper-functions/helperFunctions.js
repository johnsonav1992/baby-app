export const timeConverter = (time) => {
  const check = time.substring(0, 2)

  if (+check < 12) {
    time = time.substring(0, 5) + ' AM'
  } else if(+check === 12) {
    time = time.substring(0, 2) + time.substring(2, 5) + ' PM'
  } else {
    time = (time.substring(0, 2) - 12) + time.substring(2, 5) + ' PM'
  }

  return time
}

export const longDateCreator = (date) => {
  const converted = new Date(date.replace(/-/g, '/')).toLocaleDateString(
		'us-EN',
		{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
	)
  return converted
}

export const shortDateCreator = (date) => {
  const converted = new Date(date.replace(/-/g, '/')).toLocaleDateString(
		'us-EN',
		{ year: 'numeric', month: 'short', day: 'numeric' }
	)
  return converted
}

export const timestringToNumeric = (time) => {
  const converted = time.split(':').reduce((seconds, v) => {
    return +v + seconds * 60;
  }, 0) / 60;
  return converted
}

