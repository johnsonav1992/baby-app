export const timeConverter = (time) => {
  const check = time.substring(0, 2)

  if (check < 12) {
    time = time.substring(1, 5) + 'AM'
  } else {
    time = (time.substring(0, 2) - 12) + time.substring(2, 5) + 'PM'
  }

  return time
}

export const dateStringify = (date) => {
  const converted = new Date(date.replace(/-/g, '/')).toLocaleDateString(
		'us-EN',
		{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
	)
  return converted
}