import React from 'react'
import AgencyApproval from '../../Components/Agency/agencyApproval/agencyApproval'


function AgencyApprovalPage({rejected, rejectedMessage, agency}) {
  console.log('page reject',rejected);
  return (
        <AgencyApproval rejected={rejected} agency={agency} rejectedMessage={rejectedMessage} />
    )
}

export default AgencyApprovalPage 