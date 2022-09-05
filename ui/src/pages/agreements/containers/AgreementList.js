import { connect } from 'react-redux';
import AgreementList from '../components/AgreementList';
import {
    dispatchAgreementEditValue,
    fetchEntityData,
    fetchAgreementData,
    fetchPrivateAccessData,
    sendPrivateAccessRequest
} from '../actions';
import { hasAdminCapability } from '../../../utils/capabilities';

const mapStateToProps = state => {
    return {
        apiRoot: state.getIn(['appConfig', 'apiRoot']),
        error: state.get('apiError') === true,
        userGroups: state.get('userGroups'),
        userId: state.get('roleId'),
        isAdmin: hasAdminCapability(state),
        agreementDataLoading: state.getIn(['agreements', 'meta', 'loaded', 'agreementData']) === 'loading',
        agreementDataLoaded: state.getIn(['agreements', 'meta', 'loaded', 'agreementData']) === true,
        agreementData: state.getIn(['agreements', 'data', 'agreementData']),
        entityDataLoading: state.getIn(['agreements', 'meta', 'loaded', 'entityData']) === 'loading',
        entityDataLoaded: state.getIn(['agreements', 'meta', 'loaded', 'entityData']) === true,
        entityData: state.getIn(['agreements', 'entityData']),
        privateAccessDataLoading: state.getIn(['agreements', 'meta', 'loaded', 'privateAccessData']) === 'loading',
        privateAccessDataLoaded: state.getIn(['agreements', 'meta', 'loaded', 'privateAccessData']) === true,
        privateAccessData: state.getIn(['agreements', 'data', 'privateAccessData']),
        agreementEdit: state.getIn(['agreements', 'agreementEdit']),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateAgreementEdit: (k, v) => dispatch(dispatchAgreementEditValue(k, v)),
        sendPrivateAccessRequest: (url, id) => dispatch(sendPrivateAccessRequest(url,id)),
        fetchEntityData: (url) => dispatch(fetchEntityData(url)),
        fetchAgreementData: (url) => dispatch(fetchAgreementData(url)),
        fetchPrivateAccessData: (url) => dispatch(fetchPrivateAccessData(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgreementList);
