import React from 'react';
import messages from 'lib/text';

import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// Must use the icons explicidly to keep right
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import style from './style.css';

const menuItems = [
	{
		title: messages.drawer_home,
		url: '/',
		icon: 'home'
	},
	{
		title: messages.drawer_products,
		url: '/products',
		icon: 'local_offer'
	},
	{
		title: messages.drawer_orders,
		url: '/orders',
		icon: 'shopping_cart'
	},
	{
		title: messages.drawer_customers,
		url: '/customers',
		icon: 'person'
	},
	{
		title: messages.settings_pages,
		url: '/pages',
		icon: 'description'
	},
	{
		title: messages.files,
		url: '/files',
		icon: 'folder'
	},
	{
		title: '-',
		url: 'settings'
	},
	{
		title: messages.drawer_settings,
		url: '/settings',
		icon: 'settings'
	},
	{
		title: messages.apps,
		url: '/apps',
		icon: 'apps'
	},
	{
		title: messages.drawer_logout,
		url: '/logout',
		icon: 'exit_to_app'
	}
	/*
	Supports children nav (drop down lists)
	Example:
	{
		title: "Children Example",
		icon: 'view_agenda',
		children: [
			{
				title: "child 1",
				url: '/child1',
				icon: 'view_agenda'
			},
			{
				title: "child 2",
				url: '/child2',
				icon: 'calendar_today'
			},
		]
	} */
];

const NavListItem = ({ currentUrl, item, subItem, onClick }) => (
	<Link
		to={item.url}
		className={item.url === currentUrl ? style.linkActive : style.link}
	>
		<ListItem
			button
			onClick={onClick}
			className={subItem ? style.subItemInnerDiv : style.itemInnerDiv}
		>
			<ListItemIcon>
				<Icon
					className={item.url === currentUrl ? style.iconActive : style.icon}
				>
					{item.icon}
				</Icon>
			</ListItemIcon>
			<ListItemText primary={item.title} className={style.item} />
		</ListItem>
	</Link>
);

const SubNavListItem = ({ currentUrl, item, onClick }) => {
	const urlSelected = item.children.some(i => i.url === currentUrl);
	const [open, setOpen] = React.useState(urlSelected);

	function subMenuClick() {
		setOpen(!open);
	}

	return (
		<div>
			<ListItem button onClick={subMenuClick} className={style.itemInnerDiv}>
				{item.icon && (
					<ListItemIcon className={style.icon}>
						<Icon>{item.icon}</Icon>
					</ListItemIcon>
				)}

				<ListItemText primary={item.title} className={style.item} />

				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<SubNavList
				currentUrl={currentUrl}
				items={item.children}
				open={open}
				onClick={onClick}
			/>
		</div>
	);
};

const SubNavList = ({ currentUrl, items, onClick, open }) => (
	<Collapse in={open} unmountOnExit>
		<List component="div" disablePadding>
			{items.map((item, index) => (
				<NavListItem
					key={item.title + index}
					currentUrl={currentUrl}
					item={item}
					subItem
					onClick={onClick}
				/>
			))}
		</List>
	</Collapse>
);

const DrawerMenu = ({ open, onClose, currentUrl }) => {
	const items = menuItems.map((item, index) => {
		if (item.children) {
			return (
				<SubNavListItem
					key={index}
					currentUrl={currentUrl}
					item={item}
					onClick={onClose}
				/>
			);
		}
		if (item.title === '-') {
			return <Divider key={index} />;
		}
		return (
			<NavListItem
				key={index}
				currentUrl={currentUrl}
				item={item}
				onClick={onClose}
			/>
		);
	});

	return (
		<Drawer width="280px" anchor="left" className={style.drawer} open={open}>
			<AppBar className={style.appBar}>
				<Toolbar className={style.toolbar}>
					<Typography variant="h6" className={style.appBarTitle}>
						{messages.drawer_title}
					</Typography>
					<IconButton className={style.closeMenuIcon} onClick={onClose}>
						<ChevronLeftIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<List component="nav" className={style.menu}>
				{items}
			</List>
		</Drawer>
	);
};

export default DrawerMenu;
