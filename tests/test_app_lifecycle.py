from unittest.mock import patch

from fastapi.testclient import TestClient

from src.api import main


def test_application_lifespan_starts_serves_routes_and_stops_without_external_services():
    """Exercise the production lifespan without launching its background scheduler."""
    with (
        patch.object(main.automation_service, "start") as scheduler_start,
        patch.object(main.automation_service, "stop") as scheduler_stop,
    ):
        with TestClient(main.app) as client:
            response = client.get("/openapi.json")

            assert response.status_code == 200
            assert "/api/profiles" in response.json()["paths"]
            scheduler_start.assert_called_once_with()

        scheduler_stop.assert_called_once_with()
