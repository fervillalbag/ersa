import Layout from '../../layout/admin';
import { UserAuth } from '../../hooks/useUserInfo';

const AdminHome = () => {
	const user = UserAuth();
	console.log(user);

	return <Layout></Layout>;
};

export default AdminHome;
