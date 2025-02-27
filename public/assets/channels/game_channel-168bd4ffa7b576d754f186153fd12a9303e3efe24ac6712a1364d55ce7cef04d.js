// app/javascript/channels/game_channel.js
import consumer from "./consumer";

document.addEventListener("turbolinks:load", () => {
    const serverId = document.querySelector("[data-server-id]")?.dataset.serverId;
    if (!serverId) return;

    consumer.subscriptions.create({ channel: "GameChannel", server_id: serverId }, {
        received(data) {
            if (data.type === "all_players_joined") {
                document.querySelector("#player-list").innerHTML = data.html;
            } else if (data.type === "game_started") {
                location.reload();
            } else if (data.type === "opponent_stats_updated") {
                // Update opponent stats dynamically
                document.querySelector("#opponent-details").innerHTML = data.html;
            } else if (data.type === "player_stats_updated") {
                // Update player stats dynamically
                document.querySelector("#player-stats").innerHTML = data.html;
            } else if (data.type === "game_over") {
                alert(data.message);
                // Optionally redirect to a game summary page
                window.location.href = `/servers/${serverId}`;
            }
        }
    });
});
