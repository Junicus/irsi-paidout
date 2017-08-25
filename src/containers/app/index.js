import React from 'react';
import { Admin, Resource, Delete } from 'admin-on-rest';
import { Dashboard } from '../../components/dashboard';
import { InvoiceList, InvoiceShow, InvoiceEdit, InvoiceCreate } from '../../components/invoices';
import { VendorList } from '../../components/vendors';
import { apiClient } from '../../utils/apiClient';

const App = () => (
	<Admin dashboard={Dashboard} title="IRSI PaidOuts" restClient={apiClient(`http://localhost:3001/api`)}>
		<Resource name="invoices" list={InvoiceList} show={InvoiceShow} edit={InvoiceEdit} create={InvoiceCreate} remove={Delete} />
		<Resource name="vendors" list={VendorList} />
	</Admin>
);

export default App;
