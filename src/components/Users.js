import React from 'react'

export default (props) => {
const initials = props.user.firstName.charAt(0) + props.user.lastName.charAt(0)

  return (
    <>
      <ul class="list pl0 mt0 measure center">
        <li class="flex items-center lh-copy pa3 ph0-l bb b--black-10">
          <span >
            {' '}
            {props.user.url
              ? <img class='w2 h2 w3-ns h3-ns br-100' src={props.user.url} alt='user avatar'/>
              : <div class='w3-ns centerthis'>{initials.toUpperCase()}</div>}{' '}
          </span>
          <div class="pl3 flex-auto">
            <span class="f6 db black-70">{props.user.firstName} {props.user.lastName}</span>
            <span class="f6 db black-70">{props.user.email}</span>
          </div>
          <div>
            <a href={'/user/'+ props.user._id} class="f6 link blue hover-dark-gray">
              <div>
                Phone: {' '}
                {props.user.phone
                  ? props.user.phone
                  : 'Unknown'}{' '}
              </div>
            </a>
          </div>
        </li>
      </ul>
    </>
  ) 
}