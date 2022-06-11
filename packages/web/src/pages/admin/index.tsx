import Layout from '../../layout/admin';
import { UserAuth } from '../../hooks/useAuth';

const AdminHome = () => {
	const user = UserAuth();
	console.log(user);

	return <Layout></Layout>;
};

export default AdminHome;
