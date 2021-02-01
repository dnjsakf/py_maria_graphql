from .common import types as common_types
from .scott import types as scott_types
from .lotto import types as lotto_types
from .schedule import types as schedule_types

# types = [
#   CodeTypeType,
#   CodeType,
#   EmpType,
#   MenuType,
#   LottoPrzwinType,
#   DateScheduleType,
#   IntervalScheduleType,
#   CrontabScheduleType,
#   ScheduleType
# ]

types = common_types + scott_types + lotto_types + schedule_types