import React from 'react';
import {connect} from 'react-redux';
import {push} from 'redux-router';

export function requireAuthentication(Component) {

    const mapStateToProps = (state) => ({
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
        isStronglyAuthenticated: state.auth.isStronglyAuthenticated,
        location: state.router.location
    });


    class AuthenticatedComponent extends React.Component {

        componentWillMount () {
            this.checkAuth(this.props.isAuthenticated);
        }

        componentWillReceiveProps (nextProps) {
            this.checkAuth(nextProps.isAuthenticated);
        }

        checkAuth (isAuthenticated) {
            if (!isAuthenticated) {
                let redirectAfterLogin = this.props.location.pathname;
                this.props
                    .dispatch(push(`/login?next=${redirectAfterLogin}`));
            }
        }

        render () {
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            )

        }
    }

    AuthenticatedComponent = connect(mapStateToProps)(AuthenticatedComponent);

    return AuthenticatedComponent;

}
