import React from 'react'
import AgencyApproval from '../../Components/Agency/agencyApproval/agencyApproval'


function AgencyApprovalPage({rejected, rejectedMessage, agency}) {
  return (
        <AgencyApproval rejected={rejected} agency={agency} rejectedMessage={rejectedMessage} />
    )
}

export default AgencyApprovalPage 