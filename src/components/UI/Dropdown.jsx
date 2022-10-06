import React from 'react'
import classes from './Dropdown.module.css'

const Dropdown = ({ name, value, onChange, data }) => {
	return (
		<select className={classes.dropdown} name={name} onChange={onChange}>
			<option value={value} selected disabled>
				Select a {name}
			</option>
			{data.map(dataObj => {
				return (
					<option
						key={dataObj.id}
						id={dataObj.id}
						value={dataObj.name}
					>
						{dataObj.name}
					</option>
				)
			})}
		</select>
	)
}

export default Dropdown
