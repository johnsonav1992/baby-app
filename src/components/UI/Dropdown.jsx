import React from 'react'
import classes from './Dropdown.module.css'

const Dropdown = ({ name, value, onChange, data, addClass }) => {
	return (
		<select className={`${classes.dropdown} ${classes[addClass]}`} name={name} onChange={onChange}>
			<option selected disabled>
				{name === 'child' ? 'select child' : value}
			</option>
			{data.map(dataObj => {
				return (
					<option
						key={dataObj.id}
						id={dataObj.id}
						value={dataObj.name}
					>
						{dataObj.value || dataObj.name}
					</option>
				)
			})}
		</select>
	)
}

export default Dropdown
