import React from 'react'

import Card from '../UI/Card'
import PlusButton from '../UI/PlusButton'
import bottle from '../../assets/bottle.svg'
import sleepMoon from '../../assets/sleep.svg'
import diaper from '../../assets/diaper.svg'
import classes from './DailySummary.module.css'

const DailySummary = ({ sleeps, feedings, changings }) => {

	return (
		<Card addClass='daily-summary'>
			<div className={classes.container}>
        <h1>Daily Summary</h1>
				<div className={classes.row}>
					<div className={classes['img-wrapper']}>
						<img src={bottle} alt="bottle icon" />
					</div>
					<div className={classes.text}>
						<p>Feedings</p>
						<p>{feedings ? feedings : '-'}</p>
					</div>
					<PlusButton color="blue" />
				</div>
				<div className={classes.row}>
        <div className={classes['img-wrapper']}>
						<img src={sleepMoon} alt="sleep icon" />
					</div>
					<div className={classes.text}>
						<p>Sleep</p>
						<p>{sleeps ? sleeps : '-'}</p>
					</div>
					<PlusButton color="purple" />
				</div>
				<div className={classes.row}>
        <div className={classes['img-wrapper']}>
						<img src={diaper} alt="diaper icon" />
					</div>
					<div className={classes.text}>
						<p>Diapers</p>
						<p>{changings ? changings : '-'}</p>
					</div>
					<PlusButton color="orange" />
				</div>
			</div>
		</Card>
	)
}

export default DailySummary
