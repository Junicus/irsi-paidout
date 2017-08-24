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

export const InvoiceList = (props) => (
	<List {...props}>
		<Datagrid>
			<TextField source="id" />
			<TextField source="vendor" />
			<NumberField source="amount" options={{ style: 'currency', currency: 'USD' }} />
			<EditButton />
			<ShowButton />
		</Datagrid>
	</List >
);

export const InvoiceShow = (props) => (
	<Show {...props}>
		<SimpleShowLayout>
			<TextField source="id" />
			<DateField source="date" />
			<TextField source="vendor" />
			<NumberField source="amount" options={{ style: 'currency', currency: 'USD' }} />
		</SimpleShowLayout>
	</Show>
);

export const InvoiceEdit = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<DisabledInput source="id" />
			<DateInput source="date" />
			<TextField source="vendor" />
			<NumberInput source="amount" />
		</SimpleForm>
	</Edit>
);

export const InvoiceCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
		</SimpleForm>
	</Create>
);
