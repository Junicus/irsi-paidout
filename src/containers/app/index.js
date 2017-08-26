import React from 'react';
import { Admin, Resource, Delete } from 'admin-on-rest';
import { Dashboard } from '../../components/dashboard';
import { InvoiceList, InvoiceShow, InvoiceEdit, InvoiceCreate } from '../../components/invoices';
import { VendorList, VendorEdit, VendorCreate } from '../../components/vendors';
import { apiClient } from '../../utils/apiClient';
import { simpleRestClient } from 'admin-on-rest';

const App = () => (
	<Admin dashboard={Dashboard} title="IRSI PaidOuts" restClient={apiClient(`http://localhost:3001/api`)}>
		<Resource name="invoices" list={InvoiceList} show={InvoiceShow} edit={InvoiceEdit} create={InvoiceCreate} remove={Delete} />
		<Resource name="vendors" list={VendorList} edit={VendorEdit} create={VendorCreate} />
	</Admin>
);

export default App;
