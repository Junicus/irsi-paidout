import React from 'react';
import moment from 'moment';
import {
	List,
	Show,
	Edit,
	Create,
	Datagrid,
	TextField,
	NumberField,
	DateField,
	ReferenceField,
	SimpleShowLayout,
	SimpleForm,
	DisabledInput,
	TextInput,
	DateInput,
	NumberInput,
	EditButton,
	ShowButton,
	ReferenceInput,
	AutocompleteInput,
	Filter,
	SelectInput
} from 'admin-on-rest';

const InvoiceFilter = (props) => {
	return (
		<Filter {...props}>
			<DateInput label="Selected Date" source="created_at" defaultValue={moment().toISOString()} alwaysOn />
		</Filter>
	);
}

export const InvoiceList = (props) => {
	return (
		<List {...props} filters={<InvoiceFilter />}>
			<Datagrid>
				<TextField source="id" />
				<TextField source="vendor" />
				<NumberField source="amount" options={{ style: 'currency', currency: 'USD' }} />
				<EditButton />
				<ShowButton />
			</Datagrid>
		</List >
	);
}

export const InvoiceShow = (props) => (
	<Show {...props}>
		<SimpleShowLayout>
			<TextField source="id" />
			<DateField source="created_at" />
			<ReferenceField label="Vendor" source="vendor_id" reference="vendors">
				<TextField source="vendor" />
			</ReferenceField>
			<NumberField source="amount" options={{ style: 'currency', currency: 'USD' }} />
		</SimpleShowLayout>
	</Show>
);

export const InvoiceEdit = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<DisabledInput source="id" />
			<DateInput source="created_at" />
			<ReferenceInput label="Vendor" source="vendor_id" reference="vendors">
				<SelectInput source="vendor" />
			</ReferenceInput>
			<NumberInput source="amount" />
		</SimpleForm>
	</Edit>
);

export const InvoiceCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<DateInput label="Date" source="created_at" defaultValue={moment().toISOString()} />
			<ReferenceInput label="Vendor" source="vendor_id" reference="vendors" allowEmpty>
				<SelectInput source="name" />
			</ReferenceInput>
			<NumberInput source="amount" />
		</SimpleForm>
	</Create>
);
