import React from 'react';
import messages from 'lib/text';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import style from './style.css';

const empty_string_if_null = value => (value != null ? value : '');

export default ({
	dateCreatedFrom,
	dateCreatedTo,
	isClosed,
	isCancelled,
	isDelivered,
	isPaid,
	isHold,
	isDraft,
	setDateCreatedFrom,
	setDateCreatedTo,
	setClosed,
	setCancelled,
	setDelivered,
	setPaid,
	setHold,
	setDraft,
	settings
}) => (
	<MuiPickersUtilsProvider utils={MomentUtils}>
		<div className={style.filter}>
			<DatePicker
				className={style.select}
				name={messages.orders_date_placed_from}
				label={messages.orders_date_placed_from}
				format={settings.date_format}
				maxDate={empty_string_if_null(dateCreatedTo)}
				autoOk
				clearable
				value={dateCreatedFrom}
				onChange={setDateCreatedFrom}
				animateYearScrolling
			/>

			<DatePicker
				className={style.select}
				name={messages.orders_date_placed_to}
				label={messages.orders_date_placed_to}
				format={settings.date_format}
				minDate={empty_string_if_null(dateCreatedFrom)}
				autoOk
				clearable
				value={dateCreatedTo}
				onChange={setDateCreatedTo}
				animateYearScrolling
			/>

			<FormControl className={style.select}>
				<InputLabel htmlFor="draft">{messages.orders_draft}</InputLabel>
				<Select
					fullWidth
					name="draft"
					value={empty_string_if_null(isDraft)}
					onChange={event => {
						setDraft(event.target.value);
					}}
					inputProps={{
						name: 'draft',
						id: 'draft'
					}}
				>
					<MenuItem value={null} label=" ">
						{messages.all}
					</MenuItem>
					<MenuItem value={false}>{messages.no}</MenuItem>
					<MenuItem value={true}>{messages.yes}</MenuItem>
				</Select>
			</FormControl>

			<FormControl className={style.select}>
				<InputLabel htmlFor="hold">{messages.orders_hold}</InputLabel>
				<Select
					fullWidth
					name="hold"
					value={empty_string_if_null(isHold)}
					onChange={event => {
						setHold(event.target.value);
					}}
					inputProps={{
						name: 'hold',
						id: 'hold'
					}}
				>
					<MenuItem value={null} label=" ">
						{messages.all}
					</MenuItem>
					<MenuItem value={false}>{messages.no}</MenuItem>
					<MenuItem value={true}>{messages.yes}</MenuItem>
				</Select>
			</FormControl>

			<FormControl className={style.select}>
				<InputLabel htmlFor="paid">{messages.orders_paid}</InputLabel>
				<Select
					fullWidth
					name="paid"
					value={empty_string_if_null(isPaid)}
					onChange={event => {
						setPaid(event.target.value);
					}}
					inputProps={{
						name: 'paid',
						id: 'paid'
					}}
				>
					<MenuItem value={null} label=" ">
						{messages.all}
					</MenuItem>
					<MenuItem value={false}>{messages.no}</MenuItem>
					<MenuItem value={true}>{messages.yes}</MenuItem>
				</Select>
			</FormControl>

			<FormControl className={style.select}>
				<InputLabel htmlFor="delivered">{messages.orders_delivered}</InputLabel>
				<Select
					fullWidth
					name="delivered"
					value={empty_string_if_null(isDelivered)}
					onChange={event => {
						setDelivered(event.target.value);
					}}
					inputProps={{
						name: 'delivered',
						id: 'delivered'
					}}
				>
					<MenuItem value={null} label=" ">
						{messages.all}
					</MenuItem>
					<MenuItem value={false}>{messages.no}</MenuItem>
					<MenuItem value={true}>{messages.yes}</MenuItem>
				</Select>
			</FormControl>

			<FormControl className={style.select}>
				<InputLabel htmlFor="cancelled">{messages.orders_cancelled}</InputLabel>
				<Select
					fullWidth
					name="cancelled"
					value={empty_string_if_null(isCancelled)}
					onChange={event => {
						setCancelled(event.target.value);
					}}
					inputProps={{
						name: 'cancelled',
						id: 'cancelled'
					}}
				>
					<MenuItem value={null} label=" ">
						{messages.all}
					</MenuItem>
					<MenuItem value={false}>{messages.no}</MenuItem>
					<MenuItem value={true}>{messages.yes}</MenuItem>
				</Select>
			</FormControl>

			<FormControl className={style.select}>
				<InputLabel htmlFor="closed">{messages.orders_closed}</InputLabel>
				<Select
					fullWidth
					name="closed"
					value={empty_string_if_null(isClosed)}
					onChange={event => {
						setClosed(event.target.value);
					}}
					inputProps={{
						name: 'closed',
						id: 'closed'
					}}
				>
					<MenuItem value={null} label=" ">
						{messages.all}
					</MenuItem>
					<MenuItem value={false}>{messages.no}</MenuItem>
					<MenuItem value={true}>{messages.yes}</MenuItem>
				</Select>
			</FormControl>
		</div>
	</MuiPickersUtilsProvider>
);
