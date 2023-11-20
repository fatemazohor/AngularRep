import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faTwitter,faInstagram,faFacebook,faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent {
  faLinkdin=faLinkedin
  faFacebook=faFacebook
  faTwitter=faTwitter
  faYoutube=faYoutube
  faInstagram=faInstagram
}
