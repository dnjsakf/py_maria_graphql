import gql from 'graphql-tag';

export const SCHEDULE_QUERY = gql`
  query ScheduleQuery {
    scheduleList {
      id
      schdId
      schdType
      schdStatus
      execMsg
      date {
        edges {
          node {
            datetime
            date
            time
          }
        }
      }
      interval {
        edges {
          node {
            weeks
            days
            hours
            minutes
            seconds
            startDate
            endDate
          }
        }
      }
      crontab {
        edges {
          node {
            crontab
          }
        }
      }
    }
  }
`;