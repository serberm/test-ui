import { connect } from 'react-redux';
import ErrorScreen from '../components/ErrorScreen';

const mapStateToProps = state => {
    return {
        error: state.get('apiError')
    };
};

export default connect(mapStateToProps)(ErrorScreen);
