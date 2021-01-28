import gql from 'graphql-tag';

export const CREATE_SCHEDULE = gql`
  mutation CreateSchedule (
    $scheduleId: String
    $scheduleType: String!
    $datetime: String
    $date: String
    $time: String
    $weeks: Int
    $days: Int
    $hours: Int
    $minutes: Int
    $seconds: Int
    $startDate: String
    $endDate: String
  ) {
    createSchedule (
      input: {
        schdId: $scheduleId
        schdType: $scheduleType
      }
      date: {
        datetime: $datetime
        date: $date
        time: $time
      }
      interval: {
        weeks: $weeks
        days: $days
        hours: $hours
        minutes: $minutes
        seconds: $seconds
        startDate: $startDate
        endDate: $endDate
      }
    ) {
      success
      schedule {
        schdId
        schdType
        schdStatus
        date {
          datetime
          date
          time
        }
        interval {
          weeks
          days
          hours
          minutes
          seconds
          startDate
          endDate
        }
        crontab {
          crontab
        }
      }
    }
  }
`;