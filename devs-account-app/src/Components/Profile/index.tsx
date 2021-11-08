import { useFormik } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { logout } from '../../Reducers/Auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setUser } from '../../Reducers/Auth';

const Schema = Yup.object().shape({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
});

const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userData = useSelector((state: RootState) => state.auth.user);
    const { email, profile } = userData;

    const formik = useFormik({
        initialValues: {
            first_name: profile ? profile.first_name : null,
            last_name: profile ? profile.last_name : null,
        },
        validateOnChange: false,
        validationSchema: Schema,
        onSubmit: async (
            values,
            { setSubmitting }
        ) => {
            if (values) {
                const profile: any = { ...userData, profile: values };
                dispatch(setUser(profile));
            }
            setSubmitting(false)
        }
    });

    const logoutPage = () => {
        dispatch(logout())
    }

    return (
        <div>
            <div className="mt-5 flex justify-end">
                <button
                    className={cx("btn btn-primary")}
                    onClick={logoutPage}
                >
                    LOGOUT
                </button>
            </div>
            <h2>User Profile</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="mt-5">
                    <label className="label">
                        <span className="label-text">First Name</span>
                    </label>
                    <input
                        disabled={formik.isSubmitting}
                        value={formik.values.first_name || ''}
                        onChange={formik.handleChange("first_name")}
                        type="text"
                        className={cx("input input-bordered w-full", {
                            "border-red-400": formik.errors.first_name,
                        })}
                    />
                    {formik.errors.first_name && (
                        <div className="text-red-500">{formik.errors.first_name}</div>
                    )}
                </div>
                <div className="mt-5">
                    <label className="label">
                        <span className="label-text">Last Name</span>
                    </label>
                    <input
                        disabled={formik.isSubmitting}
                        value={formik.values.last_name || ''}
                        onChange={formik.handleChange("last_name")}
                        type="text"
                        className={cx("input input-bordered w-full", {
                            "border-red-400": formik.errors.last_name,
                        })}
                    />
                    {formik.errors.first_name && (
                        <div className="text-red-500">{formik.errors.last_name}</div>
                    )}
                </div>
                <div className="mt-5">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        readOnly
                        type="email"
                        value={email || ''}
                        className={cx("input input-bordered w-full")}
                    />
                </div>
                <div className="mt-5 flex justify-start">
                    <button
                        type="submit"
                        className={cx("btn btn-primary", {
                            loading: formik.isSubmitting,
                        })}
                    >
                        SAVE CHANGES
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Profile;
