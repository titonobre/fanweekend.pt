<template>
  <section class="section">
    <div class="container content">
      <h1>Be Part of It!</h1>

      <p>
        You are free to watch the event streaming. But if you want to be part of
        it, you can.
      </p>

      <p>
        There is a participant kit, for the unitary price of <b>&euro;50</b>.
        This includes:
      </p>
      <ul>
        <li>Event Merchandising</li>
        <li>Exclusive Mini Set</li>
        <li>Raffle Ticket</li>
        <li>Access to some exclusive activities (LEGO bricks included)</li>
        <li>Shipping costs for wherever you are!</li>
        <li>Access to the event conference call so you can interact with the hosts and other participants</li>
        <li>Access to an after-hours online lounge (unfortunatly, this time you will have to provide both the food and drinks)</li>
      </ul>

      <p>More detailed information is available on the registration form.</p>

      <p class="has-text-centered">
        <button class="button is-disabled" disabled>
          <span class="icon"><i class="fa fa-fw fa-pencil-square-o"></i></span>
          <span>Take me to the registration form</span>
        </button>
      </p>

      <article class="message">
        <div class="message-body">
          <b>Please note</b> the registration is now closed!
        </div>
      </article>

      <p>Don't forget to read the latest announcements in the event lobby.</p>

      <p class="has-text-centered">
        <nuxt-link to="/lobby" class="button is-success">
          <span class="icon"><i class="fa fa-fw fa-comments"></i></span>
          <span>Take me to the Lobby</span>
        </nuxt-link>
      </p>
    </div>
  </section>
</template>
