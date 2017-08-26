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

export const VendorEdit = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<DisabledInput source="id" />
			<TextInput source="name" />
		</SimpleForm>
	</Edit>
);

export const VendorCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="name" />
		</SimpleForm>
	</Create>
);

