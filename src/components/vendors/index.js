import React from 'react';
import {
	List,
	Show,
	Edit,
	Create,
	Datagrid,
	TextField,
	NumberField,
	DateField,
	SimpleShowLayout,
	SimpleForm,
	DisabledInput,
	TextInput,
	DateInput,
	NumberInput,
	EditButton,
	ShowButton
} from 'admin-on-rest';

export const VendorList = (props) => (
	<List {...props}>
		<Datagrid>
			<TextField source="id" />
			<TextField source="name" />
		</Datagrid>
	</List >
);
