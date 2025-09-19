
import { Injectable } from '@angular/core';
import {HttpInterceptor,HttpRequest,HttpHandler,HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}

// }


//  3. Real-Time Alerts
// Idea: Use SignalR on .NET backend to push live updates to Angular (e.g., when asset is flagged/disposed/moved).

// Create a Hub in .NET: AssetAlertsHub

// From controllers, hub.Clients.All.SendAsync("AssetAlert", message)

// Angular uses @microsoft/signalr to connect and receive alerts in real-time → show them as toast/snackbar notifications.

// This lets you see live location change / flagged status events.

//  4. UI Styling — Techy Orange / Black / White Theme
// Use TailwindCSS or PrimeNG themes

// Colors:

// Primary: #ff6600 (Orange)

// Background: #0d0d0d (Dark)

// Text: #ffffff / #cccccc

// Add:

// Card-based layout

// Neon hover glows

// Animated numbers / charts

// Charts ideas: Use ng2-charts or apexcharts to show:

// Total Assets

// Flagged Assets

// Disposed Assets

// Usage by Department

//  5. Future Features (Cloud + AI + ML)
// These will make your project stand out as modern & industry-aligned:

//  AI / ML Ideas
// Predictive asset failure / replacement using past usage logs (basic regression/ML)

// Anomaly detection for location — alert if an asset moves outside allowed zone (geo-fencing)

// Chatbot for IT queries (OpenAI API or Azure OpenAI)

// Cloud Features
// Deploy backend to Azure App Service

// Deploy frontend to Netlify/Vercel

// Use Azure SQL / CosmosDB for scalable data

// Store JWT keys / secrets in Azure Key Vault

// Set up CI/CD pipeline with GitHub Actions

// Functional Features
// E-waste disposal module

// Asset lifecycle timeline (procured → active → disposed)

// Role-based dashboards (Admin vs Department)

// QR code-based check-in/out

// Audit log of every action on assets


