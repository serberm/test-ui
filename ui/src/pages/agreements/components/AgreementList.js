import React, { useEffect } from 'react';
import { entitiesDataUrl, agreementDataUrl, privateAccessItemsUrl, privateAccessRequestUrl } from '../../../utils/API';
import { Map, Set } from 'immutable';
import { currencyArray, agreementType, trancheArray, } from './agreementInfo';
import { formatCurrency, fromBigInt } from '../../../utils/bigInt';
import { formatAndDisplayDate } from '../../../utils/date';
import { NO_VALUE_PLACEHOLDER } from '../../../lib/lib.const';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Modal } from 'react-bootstrap';
import { AGREEMENT_VIEW_ROUTE_FACTORY } from '../../../routes.const';

const AgreementList = ({
    history,
    apiRoot,
    error,
    agreementDataLoading,
    agreementDataLoaded,
    agreementData,
    fetchAgreementData,
    entityDataLoading,
    entityDataLoaded,
    entityData,
    privateAccessDataLoading,
    privateAccessDataLoaded,
    privateAccessData,
    agreementEdit = Set(),
    updateAgreementEdit,
    isAdmin,
    fetchEntityData,
    fetchPrivateAccessData,
    sendPrivateAccessRequest
}) => {
    const agreementsList = (agreementData || Map()).toJS();

    const isLoaded = agreementDataLoaded && entityDataLoaded && !error;

    useEffect(() => {
        if (!entityDataLoading && !entityDataLoaded && !error) {
            fetchEntityData(entitiesDataUrl(apiRoot));
        }

        if (!agreementDataLoading && !agreementDataLoaded && !error) {
            fetchAgreementData(agreementDataUrl(apiRoot));
        }

        if (!privateAccessDataLoading && !privateAccessDataLoaded && !error) {
            fetchPrivateAccessData(privateAccessItemsUrl(apiRoot));
        }
    });

    if (!isLoaded) {
        return (
            <div className={'app-content div-table-color'}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    const stringCompare = (a, b) => {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    };

    const privateAccessRequest = (ref) => {
        sendPrivateAccessRequest(privateAccessRequestUrl(apiRoot, ref), ref);
    };

    const getOwnerName = (agreement) => {

        const parentEntityShortCodeParam = (
            (
                entityData.find((borrowerEntity) => {
                    return (

                        (
                            entityData.find((sub) => {
                                return (
                                    sub.get('id') === agreement.entity_id &&
                                    sub.get('entityTypes').includes('SUBSIDIARY')
                                );
                            }) || Set()
                        ).get('entity_id') === borrowerEntity.get('id') &&
                        borrowerEntity.get('entityTypes').includes('TOP_LEVEL')
                    );
                }) || Set()
            ).get('shortCode') ||
            ''
        ).toLowerCase();

        return (entityData.find((entity) => {
            return (entity.get('shortCode') || '') === parentEntityShortCodeParam;
        }) || Map()).get('name');

    };

    const getCardholder = (agreement) => {
        return (
            entityData.find((sub) => {
                return (
                    sub.get('id') === agreement.entity_id &&
                    sub
                        .get('entityTypes')
                        .includes('SUBSIDIARY')
                );
            }) || Set()
        ).get('name') || '';
    };

    return (
        <>
            <table className={'table table-dark app-content interactive clickable'}>
                <thead>
                <tr>
                    <th scope={'col'}>Cardholder</th>
                    <th scope={'col'}>Owner</th>
                    <th scope={'col'}>Agreement</th>
                    <th scope={'col'}>Tranche</th>
                    <th scope={'col'}>Maturity Date</th>
                    <th scope={'col'}>Currency</th>

                    <th scope={'col'}>Agreement size</th>
                    <th scope={'col'}>Access Rights</th>
                </tr>
                </thead>
                <tbody>
                {(() => {
                    if (agreementsList) {
                        return Object.entries(agreementsList)
                            .map((agreement) => {
                                return agreement;
                            })
                            .sort((a, b) => {
                                return stringCompare(getCardholder(a[1]), getCardholder(b[1])) ||
                                    stringCompare(a[1].type || '', b[1].type || '') || stringCompare(a[1].tranche || '', b[1].tranche || '');
                            })
                            .map(([id, agreement]) => {
                                const access = isAdmin || privateAccessData?.getIn([agreement.privateItem_id, 'private']);
                                const viewRoute = AGREEMENT_VIEW_ROUTE_FACTORY(agreement.id);
                                return (
                                    <tr className={'agreement-list-row'} key={id}
                                        onClick={() => history.push(viewRoute)}>
                                        <td>
                                            {getCardholder(agreement) || NO_VALUE_PLACEHOLDER}
                                        </td>
                                        <td>{getOwnerName(agreement) || NO_VALUE_PLACEHOLDER}</td>
                                        <td>{agreementType[agreement.type]}</td>
                                        <td>{trancheArray[agreement.tranche]}</td>
                                        <td>{formatAndDisplayDate(agreement.maturityDate)}</td>
                                        <td>{currencyArray[agreement.currency]}</td>
                                        <td>
                                            {formatCurrency(
                                                fromBigInt(agreement.agreementSize),
                                                agreement.currency
                                            )}
                                        </td>
                                        <td className={'icon-td'}>{access ?
                                            <div className={'lock-container'}><LockIcon
                                                fontSize={'small'}/><label>Private</label></div>
                                            : <div className={'lock-open-container agreement-edit-access-container'}
                                                   onClick={(e) => {
                                                       e.stopPropagation();
                                                       updateAgreementEdit('modalRequest', agreement.id);
                                                   }}>
                                                <LockOpenIcon fontSize={'small'}/>
                                                <label>Public</label></div>
                                        }
                                        </td>

                                    </tr>
                                );
                            });
                    }
                })()}
                </tbody>
            </table>
            {agreementEdit.get('modalRequest') && (
                <Modal show={true} onHide={() => updateAgreementEdit('modalRequest', false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Request private access</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>You are about to send a request to gain private access to this agreement. Proceed?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className={'btn btn-secondary'}
                                onClick={() => updateAgreementEdit('modalRequest', false)}>
                            Close
                        </button>
                        <button className={'btn btn-primary'}
                                onClick={() => privateAccessRequest(agreementEdit.get('modalRequest'))}>
                            Send
                        </button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default AgreementList;
