<template>
  <section class="section">
    <div class="container content">
      <h1>When</h1>
      <p>The event takes place from 12 to 14 of June, 2020. Setup will be on 11 of June, 2020. Be sure to put it into your calendar - and then put a big X next to it!</p>

      <div class="calendar-container">
        <div class="calendar">
          <div class="calendar-nav">
            <div class="calendar-nav-left">
            </div>
            <div>June 2019</div>
            <div class="calendar-nav-right">
            </div>
          </div>
          <div class="calendar-header">
            <div class="calendar-date">Mon</div>
            <div class="calendar-date">Tue</div>
            <div class="calendar-date">Wed</div>
            <div class="calendar-date">Thu</div>
            <div class="calendar-date">Fri</div>
            <div class="calendar-date">Sat</div>
            <div class="calendar-date">Sun</div>
          </div>
          <div class="calendar-body">
            <div class="calendar-date"><div class="date-item">1</div></div>
            <div class="calendar-date"><div class="date-item">2</div></div>
            <div class="calendar-date"><div class="date-item">3</div></div>
            <div class="calendar-date"><div class="date-item">4</div></div>
            <div class="calendar-date"><div class="date-item">5</div></div>
            <div class="calendar-date"><div class="date-item">6</div></div>
            <div class="calendar-date"><div class="date-item">7</div></div>
            <div class="calendar-date"><div class="date-item">8</div></div>
            <div class="calendar-date"><div class="date-item">9</div></div>
            <div class="calendar-date"><div class="date-item">10</div></div>
            <div class="calendar-date"><div class="date-item is-today">11</div></div>
            <div class="calendar-date calendar-range range-start"><div class="date-item is-active">12</div></div>
            <div class="calendar-date calendar-range"><div class="date-item">13</div></div>
            <div class="calendar-date calendar-range range-end"><div class="date-item is-active">14</div></div>
            <div class="calendar-date"><div class="date-item">15</div></div>
            <div class="calendar-date"><div class="date-item">16</div></div>
            <div class="calendar-date"><div class="date-item">17</div></div>
            <div class="calendar-date"><div class="date-item">18</div></div>
            <div class="calendar-date"><div class="date-item">18</div></div>
            <div class="calendar-date"><div class="date-item">20</div></div>
            <div class="calendar-date"><div class="date-item">21</div></div>
            <div class="calendar-date"><div class="date-item">22</div></div>
            <div class="calendar-date"><div class="date-item">23</div></div>
            <div class="calendar-date"><div class="date-item">24</div></div>
            <div class="calendar-date"><div class="date-item">25</div></div>
            <div class="calendar-date"><div class="date-item">26</div></div>
            <div class="calendar-date"><div class="date-item">27</div></div>
            <div class="calendar-date"><div class="date-item">28</div></div>
            <div class="calendar-date"><div class="date-item">29</div></div>
            <div class="calendar-date"><div class="date-item">30</div></div>
            <div class="calendar-date" disabled="disabled"><div class="date-item">1</div></div>
            <div class="calendar-date" disabled="disabled"><div class="date-item">2</div></div>
            <div class="calendar-date" disabled="disabled"><div class="date-item">3</div></div>
            <div class="calendar-date" disabled="disabled"><div class="date-item">4</div></div>
            <div class="calendar-date" disabled="disabled"><div class="date-item">5</div></div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.screen {
  min-height: 100vh;
}

.calendar-container {
  display: flex;
  justify-content: center;
}

.calendar {
  background: white;
  border: none;
  border-radius: 2px;
  display: block;
  min-width: 20rem;
  text-align: center;
  max-width: 20rem;
}

.calendar.is-active {
  display: initial;
}

.calendar .calendar-nav {
  align-items: center;
  background: #00d1b2;
  color: white;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.25rem;
  padding: 0.5rem;
}

.calendar .calendar-header,
.calendar .calendar-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0.2rem 0;
}

.calendar .calendar-header .calendar-date,
.calendar .calendar-body .calendar-date {
  flex: 0 0 14.28%;
  max-width: 14.28%;
}

.calendar .calendar-header {
  background: #00b89c;
  color: #fff;
  font-size: 0.75rem;
}

.calendar .calendar-body {
  padding: 0;
  color: #7a7a7a;
}

.calendar .calendar-date {
  border: 0;
  padding: 0.4rem;
}

.calendar .calendar-date .date-item {
  appearance: none;
  background: transparent;
  border: 0.1rem solid transparent;
  border-radius: 100%;
  color: #4a4a4a;
  cursor: default;
  height: 2.2rem;
  line-height: 1.4rem;
  outline: none;
  padding: 0.3rem;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s ease;
  vertical-align: middle;
  white-space: nowrap;
  width: 2.2rem;
}

.calendar .calendar-date .date-item.is-today {
  background: transparent;
  border-color: #00d1b2;
  color: #00d1b2;
}

.calendar .calendar-date .date-item.is-active {
  background: #00d1b2;
  border-color: #00d1b2;
  color: #fff;
}

.calendar .calendar-date.is-disabled .date-item,
.calendar .calendar-date.is-disabled .calendar-event,
.calendar .calendar-date[disabled] .date-item,
.calendar .calendar-date[disabled] .calendar-event {
  opacity: 0.25;
}

.calendar .calendar-range {
  position: relative;
}

.calendar .calendar-range::before {
  background: #d1fff8;
  content: "";
  height: 2.2rem;
  left: 0;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.calendar .calendar-range.range-start::before {
  left: 50%;
}

.calendar .calendar-range.range-end::before {
  right: 50%;
}

.calendar .calendar-range .date-item {
  color: #00d1b2;
}

</style>
