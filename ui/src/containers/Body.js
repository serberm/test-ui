import { connect } from 'react-redux';
import Body from '../components/Body';

const mapStateToProps = state => {
    return {
        isReady: state.get('appConfig').size !== 0
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
