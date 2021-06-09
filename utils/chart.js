import _ from 'lodash';

export const weeklyChart = state => {
  const labels = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

  const weeklyRegChartData = [];
  const weeklyOrderChartData = [];

  if (state.users) {
    const users = state.users;
    const mon = _.filter(users, u => {
      return new Date(u.createdAt).getDay() === 1; //1 Represents monday
    });
    const tue = _.filter(users, u => {
      return new Date(u.createdAt).getDay() === 2; //2 Represents tuesday
    });
    const wed = _.filter(users, u => {
      return new Date(u.createdAt).getDay() === 3; //3 Represents wednesday
    });
    const thur = _.filter(users, u => {
      return new Date(u.createdAt).getDay() === 4; //4 Represents thursday
    });
    const fri = _.filter(users, u => {
      return new Date(u.createdAt).getDay() === 5; //5 Represents friday
    });
    const sat = _.filter(users, u => {
      return new Date(u.createdAt).getDay() === 6; //6 Represents saturday
    });
    const sun = _.filter(users, u => {
      return new Date(u.createdAt).getDay() === 7; //2 Represents sunday
    });

    weeklyRegChartData.push(
      mon.length,
      tue.length,
      wed.length,
      thur.length,
      fri.length,
      sat.length,
      sun.length,
    );
  }

  if (state.rentals) {
    const rentals = state.rentals;
    const mon = _.filter(rentals, u => {
      return new Date(u.createdAt).getDay() === 1; //1 Represents monday
    });
    const tue = _.filter(rentals, u => {
      return new Date(u.createdAt).getDay() === 2; //2 Represents tuesday
    });
    const wed = _.filter(rentals, u => {
      return new Date(u.createdAt).getDay() === 3; //3 Represents wednesday
    });
    const thur = _.filter(rentals, u => {
      return new Date(u.createdAt).getDay() === 4; //4 Represents thursday
    });
    const fri = _.filter(rentals, u => {
      return new Date(u.createdAt).getDay() === 5; //5 Represents friday
    });
    const sat = _.filter(rentals, u => {
      return new Date(u.createdAt).getDay() === 6; //6 Represents saturday
    });
    const sun = _.filter(rentals, u => {
      return new Date(u.createdAt).getDay() === 7; //2 Represents sunday
    });

    weeklyOrderChartData.push(
      mon.length,
      tue.length,
      wed.length,
      thur.length,
      fri.length,
      sat.length,
      sun.length,
    );
  }

  return {
    regs: { label: labels, data: weeklyRegChartData },
    rentals: { label: labels, data: weeklyOrderChartData },
  };
};

export const monthlyChart = state => {
  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const monthlyRegChartData = [];
  const monthlyOrderChartData = [];

  if (state.users) {
    const jan = _.filter(state.users, u => {
      return new Date(u.createdAt).getMonth() === 0;
    });
    const feb = _.filter(state.users, u => {
      return new Date(u.createdAt).getMonth() === 1;
    });
    const mar = _.filter(state.users, u => {
      return new Date(u.createdAt).getMonth() === 2;
    });
    const apr = _.filter(state.users, u => {
      return new Date(u.createdAt).getMonth() === 3;
    });
    const may = _.filter(state.users, u => {
      return new Date(u.createdAt).getMonth() === 4;
    });
    const jun = _.filter(state.users, u => {
      return new Date(u.createdAt).getMonth() === 5;
    });
    const jul = _.filter(state.users, u => {
      return new Date(u.createdAt).getMonth() === 6;
    });
    const aug = _.filter(state.users, u => {
      return new Date(u.createdAt).getMonth() === 7;
    });
    const sept = _.filter(state.users, u => {
      return new Date(u.createdAt).getMonth() === 8;
    });
    const oct = _.filter(state.users, u => {
      return new Date(u.createdAt).getMonth() === 9;
    });
    const nov = _.filter(state.users, u => {
      return new Date(u.createdAt).getMonth() === 10;
    });
    const dec = _.filter(state.users, u => {
      return new Date(u.createdAt).getMonth() === 11;
    });

    monthlyRegChartData.push(
      jan.length,
      feb.length,
      mar.length,
      apr.length,
      may.length,
      jun.length,
      jul.length,
      aug.length,
      sept.length,
      oct.length,
      nov.length,
      dec.length,
    );
  }

  if (state.rentals) {
    const jan = _.filter(state.rentals, u => {
      return new Date(u.createdAt).getMonth() === 0;
    });
    const feb = _.filter(state.rentals, u => {
      return new Date(u.createdAt).getMonth() === 1;
    });
    const mar = _.filter(state.rentals, u => {
      return new Date(u.createdAt).getMonth() === 2;
    });
    const apr = _.filter(state.rentals, u => {
      return new Date(u.createdAt).getMonth() === 3;
    });
    const may = _.filter(state.rentals, u => {
      return new Date(u.createdAt).getMonth() === 4;
    });
    const jun = _.filter(state.rentals, u => {
      return new Date(u.createdAt).getMonth() === 5;
    });
    const jul = _.filter(state.rentals, u => {
      return new Date(u.createdAt).getMonth() === 6;
    });
    const aug = _.filter(state.rentals, u => {
      return new Date(u.createdAt).getMonth() === 7;
    });
    const sept = _.filter(state.rentals, u => {
      return new Date(u.createdAt).getMonth() === 8;
    });
    const oct = _.filter(state.rentals, u => {
      return new Date(u.createdAt).getMonth() === 9;
    });
    const nov = _.filter(state.rentals, u => {
      return new Date(u.createdAt).getMonth() === 10;
    });
    const dec = _.filter(state.rentals, u => {
      return new Date(u.createdAt).getMonth() === 11;
    });

    monthlyOrderChartData.push(
      jan.length,
      feb.length,
      mar.length,
      apr.length,
      may.length,
      jun.length,
      jul.length,
      aug.length,
      sept.length,
      oct.length,
      nov.length,
      dec.length,
    );
  }

  return {
    regs: { label: labels, data: monthlyRegChartData },
    rentals: { label: labels, data: monthlyOrderChartData },
  };
};
