import React from 'react';
import { Formik } from 'formik';
import axios from "axios";

axios.defaults.withCredentials = true;

// This will automatically send the cookie in requests. 
/*XMLHttpRequest from a different domain cannot set cookie
 values for their own domain unless withCredentials is 
 set to true before making the request.*/


const LoginPage = () => (
  <div>
    <h1>This is login page!</h1>
    <Formik
      initialValues={{ login: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {      //что это setSubmitting?
        // const data = new FormData(event.target);

        // fetch('/api/form-submit-url', {
        //   method: 'POST',
        //   body: data,
        // });
        axios.post('http://localhost:3000/api/v1/login', values)
          .then((res) => {
            console.log(res);
            console.log(res.data);
          }).catch((error) => {
            console.log(error)
          })

      }}

    // axios.post('http://localhost:4000/users/create', userObject)
    //     .then((res) => {
    //         console.log(res.data)
    //     }).catch((error) => {
    //         console.log(error)
    //     });

    // console.log(values)
    // const url = 'http://localhost:3000/api/v1/login';
    // const res = await fetch(url, {
    //   method: 'POST',
    //   body: { "login": values.login, "password": values.password },
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'accept': 'application/json'
    //   },
    //   mode: 'no-cors',
    //   // credentials: 'include',


    // })
    // console.log(res)

    // curl -X POST "http://localhost:3000/api/v1/login" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"login\": \"Admin\", \"password\": \"admin123\"}"
    // {"name":"SUPERUSER","role":"admin"}

    // values.login = ''
    // values.password = ''
    // }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        handleReset,
        /* and other goodies */
      }) => (
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <input
              type="login"
              name="login"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.login}
              required={true}
              error={touched.login && errors.login}
            />
            {/* {errors.login && touched.login && errors.login} */}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              required={true}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
          </button>
            <button type="reset" disabled={isSubmitting}>
              Reset
          </button>
          </form>
        )}
    </Formik>

    <button type="logout" onClick={() => {
      axios.post('http://localhost:3000/api/v1/logout')
        .then((res) => {
          console.log(res);
          console.log(res.data);
        }).catch((error) => {
          console.log(error)
        })
    }}>
      logout
          </button>
  </div>
);

export default LoginPage;