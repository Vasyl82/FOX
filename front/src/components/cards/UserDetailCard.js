import React from 'react'
import {
  CLink,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CListGroup,
  CListGroupItem
} from "@coreui/react";

const UserDetailCard = props => {
  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between">
        <CCardTitle>{props.userRole} {props.details.name} details</CCardTitle>
        <CLink to={`${props.location.pathname}/edit`}>Edit {props.userRole.toLowerCase()}</CLink>
      </CCardHeader>
      <CCardBody>
        <CListGroup flush>
          {Object.entries(props.details).map(([key, value]) => {
            return (
              <CListGroupItem key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}:</strong> {value}
              </CListGroupItem>
            )
          })}
          {props.userRole == "Contractor" ?
            <CListGroupItem>
              <CLink
                to={`/contractors/${props.match.params.id}/workers_review`}
              >Browse workers</CLink>
            </CListGroupItem>
            : null
          }
        </CListGroup>
      </CCardBody>
    </CCard>
  )
}

export default UserDetailCard