import React from 'react';
import { Admin, Resource, Delete } from 'admin-on-rest';
import { Dashboard } from '../../components/dashboard';
import { InvoiceList, InvoiceShow, InvoiceEdit, InvoiceCreate } from '../../components/invoices';
import { apiClient } from '../../utils/apiClient';

const App = () => (
	<Admin dashboard={Dashboard} title="IRSI PaidOuts" restClient={apiClient(`http://localhost:3001/api`)}>
		<Resource name="invoices" list={InvoiceList} show={InvoiceShow} edit={InvoiceEdit} create={InvoiceCreate} remove={Delete} />
	</Admin>
);

export default App;
